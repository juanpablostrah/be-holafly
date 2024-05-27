import { Injectable } from '@nestjs/common';

export type Consumption = {
  totalConsumption: number;
};

export type Card = {
  userId: number,
  status: string,
  dateStart: string,
  dateEnd: string,
  consumption: Consumption,
  flag: string,
  country: string,
  plan: string
};

@Injectable()
export class CardsService {
  private readonly cards = [
    {
      status: "Expired",
      dateStart: "01/01/2023",
      dateEnd: "04/01/2023",
      consumption: null,
      flag: "https://img.freepik.com/fotos-premium/bandera-colombiana-texturizada-colombia_469558-18062.jpg",
      country: 'Colombia',
      plan: "4 días, 3GB",
      userId: 1,
    },
    {
      status: "Expired",
      dateStart: "02/01/2023",
      dateEnd: "02/01/2023",
      consumption: null,
      flag: "https://img.freepik.com/fotos-premium/bandera-colombiana-texturizada-colombia_469558-18062.jpg", 
      country: 'Colombia',
      plan: "30 días, 25GB",
      userId: 1,
    },
    {
      status: "Pending",
      dateStart: "01/01/2024",
      dateEnd: null,
      consumption: { totalConsumption: 1468006.4 },
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Bandera_peruana_DOS.jpg",
      country: 'Perú',
      plan: "1 día, 1.4GB",
      userId: 2,
    },
    {
      status: "Active",
      dateStart: "06/10/2023",
      dateEnd: "16/10/2023",
      consumption: { totalConsumption: 12582912 },
      flag: "https://img.freepik.com/vector-gratis/ilustracion-bandera-espana_53876-18168.jpg",
      country: 'España',
      plan: "10 días, 12GB",
      userId: 2,
    },{
      status: "Expired",
      dateStart: "02/01/2023",
      dateEnd: "02/01/2023",
      consumption: null,
      flag: "https://img.freepik.com/fotos-premium/bandera-colombiana-texturizada-colombia_469558-18062.jpg", 
      country: 'Colombia',
      plan: "30 días, 25GB",
      userId: 2,
    },
    {
      status: "Active",
      dateStart: "01/01/2024",
      dateEnd: null,
      consumption: { totalConsumption: 146606.4 },
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Bandera_peruana_DOS.jpg",
      country: 'Perú',
      plan: "1 día, 1.4GB",
      userId: 2,
    },
  ];

  getAllCards() {
    return this.cards;
  }

  async findByuserId(userId: number): Promise<Card[] | undefined> {
    return this.cards.filter(card => card.userId === userId);
  }
}
