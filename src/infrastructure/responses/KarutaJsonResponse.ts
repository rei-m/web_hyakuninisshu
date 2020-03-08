export type KarutaJsonItemResponse = Readonly<{
  id: number;
  image_no: string;
  creator: string;
  first_kanji: string;
  first_kana: string;
  second_kanji: string;
  second_kana: string;
  third_kanji: string;
  third_kana: string;
  fourth_kanji: string;
  fourth_kana: string;
  fifth_kanji: string;
  fifth_kana: string;
  kimariji: number;
  color: string;
  translation: string;
}>;

export type KarutaJsonResponse = Readonly<{
  karuta_list: Array<KarutaJsonItemResponse>;
}>;
