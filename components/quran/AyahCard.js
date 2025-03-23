import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

export const AyahCard = ({
  ayah,
  index,
  currentAyahIndex,
  isPlayingUrdu,
  setCurrentAyahIndex,
  setIsPlayingUrdu,
  audioRefs,
  urduAudioRefs,
  ayahRefs,
  handleArabicAudioEnded,
  handleUrduAudioEnded,
}) => {
  return (
    <div
      ref={(el) => (ayahRefs.current[index] = el)}
      key={`${ayah.surahId || ''}-${ayah.numberInSurah}`}
      className={`border-b pb-4 transition-colors rounded-lg p-4 ${
        currentAyahIndex === index ? 'bg-primary/20' : 'hover:bg-muted/50'
      }`}
    >
      <p className="text-3xl font-arabic text-right mb-4">
        {ayah.arabic || 'Arabic text missing'}
      </p>
      <div className="space-y-2 text-muted-foreground">
        <p className="text-lg font-urdu text-right">
          <span className="font-semibold">اردو: </span>
          {ayah.urdu}
        </p>
        <p className="text-lg">
          <span className="font-semibold">English: </span>
          {ayah.english}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {ayah.surahId ? `Surah ${ayah.surahId}:` : ''} Verse {ayah.numberInSurah}
      </p>
      {ayah.audioUrl && (
        <AudioPlayer
          ref={(el) => (audioRefs.current[index] = el)}
          src={ayah.audioUrl}
          showJumpControls={false}
          customProgressBarSection={[]}
          customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
          className="mt-4 bg-background rounded-lg shadow-sm"
          autoPlayAfterSrcChange={currentAyahIndex === index && !isPlayingUrdu}
          onPlay={() => {
            setCurrentAyahIndex(index);
            setIsPlayingUrdu(false);
          }}
          onEnded={() => handleArabicAudioEnded(index)}
          onError={(e) => console.error('Arabic audio error:', e)}
        />
      )}
      {ayah.urduAudioUrl && (
        <AudioPlayer
          ref={(el) => (urduAudioRefs.current[index] = el)}
          src={ayah.urduAudioUrl}
          showJumpControls={false}
          customProgressBarSection={[]}
          customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
          className="mt-2 bg-background rounded-lg shadow-sm"
          autoPlayAfterSrcChange={currentAyahIndex === index && isPlayingUrdu}
          onPlay={() => setIsPlayingUrdu(true)}
          onEnded={() => handleUrduAudioEnded(index)}
          onError={(e) => console.error('Urdu audio error:', e)}
        />
      )}
    </div>
  );
};