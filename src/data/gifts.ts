import { Gift } from '@/types';

/**
 * Gift configuration data
 * Note: isCollected is derived from GameProgress.collectedGifts
 * Use useGameProgress.isGiftCollected() to check collection status
 */
export const gifts: Gift[] = [
  {
    id: 'bucket-of-happiness',
    name: 'Bucket of Happiness',
    level: 1,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200&h=200&fit=crop',
    riddleClue: 'Ruangan yang selalu berisik, dipenuhi bunyi logam beradu, tang ting tung tang ting tung!',
    answer: 'dapur',
    houseLocation: 'Dapur, di bawah meja kompor',
  },
  {
    id: 'prayer-robe',
    name: 'Prayer Robe',
    level: 2,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&h=200&fit=crop',
    riddleClue: 'Sebuah tempat yang selalu penuh, tapi kalo dicari rasanya selalu ga ada dan ga punya (Hawari)',
    answer: 'lemari baju',
    houseLocation: 'Di dalem lemari baju, di antara pakaian',
  },
  {
    id: 'parfume',
    name: 'Parfume',
    level: 3,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
    riddleClue: 'Ruangan legendaris, untouchable. Selalu menjadi misteri tiap weekend. Antara ada dan tiada',
    answer: 'gudang',
    houseLocation: 'Di gudang belakang rumah, di antara barang barang',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    level: 4,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop',
    riddleClue: 'Di mana kaki beristirahat setelah lelah melangkah, di situ harta karun tersembunyi menanti untuk ditemukan.',
    answer: 'rak sepatu',
    houseLocation: 'Di rak sepatu dekat pintu masuk rumah',
  },
  {
    id: 'bag',
    name: 'Bag',
    level: 5,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
    riddleClue: 'Di sebuah lokasi yang tidak pernah sama. Selalu berubah. Jawaban yang sering digunakan kalo di tanya "udah di mana?',
    answer: 'otw',
    houseLocation: 'Barang masih onprogress, invoicenya dulu ya',
  },
  {
    id: 'bouquet',
    name: 'Bouquet of Flowers',
    level: 6,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
    riddleClue: 'Akses menuju jalan keluar atau kedalam',
    answer: 'pintu',
    houseLocation: 'Buka pintu depan rumah',
  },
];

// Bonus gift (optional)
export const bonusGift: Gift = {
  id: 'bouquet',
  name: 'Bouquet of Flowers',
  level: 0,
  image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop',
  riddleClue: 'A surprise bonus awaits! Look where meals are made with love...',
  answer: 'kitchen',
  houseLocation: 'In the kitchen, on the counter',
};
