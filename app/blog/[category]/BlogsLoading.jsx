"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function BlogsLoading({ category, categorySlug }) {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1); // Start at page 1 for initial fetch
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState(null); // Store totalBlogs after first fetch
  const observerRef = useRef(null);

  const fetchBlogs = async (pageNum) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/blogs/category?category=${encodeURIComponent(category)}&page=${pageNum}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const { blogs: newBlogs, totalBlogs: fetchedTotal } = await response.json();

      setBlogs((prevBlogs) => (pageNum === 1 ? newBlogs : [...prevBlogs, ...newBlogs]));
      if (pageNum === 1) setTotalBlogs(fetchedTotal); // Set totalBlogs only on initial fetch
      setPage((prevPage) => prevPage + 1);
      setHasMore(newBlogs.length > 0 && (pageNum === 1 ? newBlogs.length < fetchedTotal : blogs.length + newBlogs.length < totalBlogs));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchBlogs(1);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchBlogs(page);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the target is visible
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, page]);

  return (
    <div>
      {blogs.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <AlertCircle className="h-16 w-16 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">No Blogs Found</h2>
          <p className="text-base sm:text-lg max-w-md mb-6">
            It looks like there are no blogs in the "{category}" category yet.
            Check back later or explore other categories!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {blog.imageUrl && (
                <Image
                  width={400}
                  height={200}
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold">
                    {blog.title}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
                  <span className="text-xs sm:text-sm">
                    {blog?.likes?.length || 0}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm">
                  {blog.content.replace(/<[^>]+>/g, "").substring(0, 100) + "..."}
                </p>
                <Link href={`/blog/${categorySlug}/${blog.slug}`}>
                  <Button className="mt-4 w-full text-sm sm:text-base py-2">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Loading Indicator and Observer Target */}
      {hasMore && (
        <div ref={observerRef} className="mt-8 flex justify-center">
          {isLoading ? (
            <p className="text-sm">Loading more blogs...</p>
          ) : (
            <p className="text-sm">Scroll to load more</p>
          )}
        </div>
      )}
    </div>
  );
}