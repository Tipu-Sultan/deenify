import { ScrollText, Languages } from 'lucide-react';
import { AyahCard } from './AyahCard';

export const MainContent = ({
  surahData,
  juzData,
  currentSurah,
  currentJuz,
  englishTranslator,
  setEnglishTranslator,
  currentAyahIndex,
  setCurrentAyahIndex,
  isPlayingUrdu,
  setIsPlayingUrdu,
  audioRefs,
  urduAudioRefs,
  ayahRefs,
  handleArabicAudioEnded,
  handleUrduAudioEnded,
}) => {
  const displayData = surahData || juzData;
  const englishTranslators = [
    { id: 'en.sahih', name: 'Sahih International' },
    { id: 'en.asad', name: 'Muhammad Asad' },
    { id: 'en.pickthall', name: 'Pickthall' },
    { id: 'en.yusufali', name: 'Yusuf Ali' },
  ];

  return (
    <div className="flex-1 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            The Holy Quran
          </h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ScrollText className="h-5 w-5" />
              <span>
                {surahData
                  ? `Surah ${currentSurah}: ${surahData.englishName} (${surahData.name})`
                  : `Juz ${currentJuz}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Languages className="h-5 w-5" />
              <select
                value={englishTranslator}
                onChange={(e) => setEnglishTranslator(e.target.value)}
                className="bg-background border rounded-lg px-2 py-1"
              >
                {englishTranslators.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {displayData?.verses?.map((ayah, index) => (
              <AyahCard
                key={`${ayah.surahId || currentSurah}-${ayah.numberInSurah}`}
                ayah={ayah}
                index={index}
                currentAyahIndex={currentAyahIndex}
                setCurrentAyahIndex={setCurrentAyahIndex}
                isPlayingUrdu={isPlayingUrdu}
                setIsPlayingUrdu={setIsPlayingUrdu}
                audioRefs={audioRefs}
                urduAudioRefs={urduAudioRefs}
                ayahRefs={ayahRefs}
                handleArabicAudioEnded={handleArabicAudioEnded}
                handleUrduAudioEnded={handleUrduAudioEnded}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};