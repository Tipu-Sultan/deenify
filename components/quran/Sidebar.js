import { Menu } from 'lucide-react';

export const Sidebar = ({ surahsList, currentSurah, setCurrentSurah, currentJuz, setCurrentJuz, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quran Navigation</h2>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <select
            value={currentSurah}
            onChange={(e) => {
              setCurrentSurah(parseInt(e.target.value));
              setCurrentJuz(0);
            }}
            className="w-full p-2 bg-background border rounded-lg"
          >
            {surahsList.map((surah) => (
              <option key={surah.number} value={surah.number}>
                {surah.number}. {surah.englishName} ({surah.name})
              </option>
            ))}
          </select>
          <select
            value={currentJuz}
            onChange={(e) => {
              setCurrentJuz(parseInt(e.target.value));
              setCurrentSurah(0);
            }}
            className="w-full p-2 bg-background border rounded-lg"
          >
            <option value={0}>Select Juz</option>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
              <option key={juz} value={juz}>
                Juz {juz}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};