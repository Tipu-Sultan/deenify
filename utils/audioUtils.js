export const formatNumber = (num) => String(num).padStart(3, '0');

export const getAudioUrl = (narrator, surah, ayah) => {
  const audioBaseUrl = 'https://minhaj.net/downloads/irfan-ul-quran';
  const surahFormatted = formatNumber(surah);
  const ayahFormatted = formatNumber(ayah);
  return `${audioBaseUrl}/${narrator}/${surahFormatted}/${surahFormatted}_${ayahFormatted}.mp3`;
};

export const narrators = {
  arabic: 'Mishary-Rashid-Alafasy',
  urdu: 'Tasleem-Ahmed-Sabri',
};