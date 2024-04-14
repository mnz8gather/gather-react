import { Controller, Get, Query } from '@nestjs/common';

@Controller('paradigm')
export class ParadigmController {
  @Get('/user')
  alpha(
    @Query('page') pageStr: string,
    @Query('size') sizeStr: string,
    @Query('gender') gender?: string,
  ) {
    const page = parseInt(pageStr, 10);
    const size = parseInt(sizeStr, 10);
    let temp = list;
    if (gender) {
      temp = list.filter((item) => item.gender === gender);
    }
    const total = temp.length;

    if (page < 1) {
      return {
        result: [],
        page,
        size,
        total,
      };
    }

    const a = (page - 1) * size;

    if (page !== 1 && a > total) {
      return {
        result: [],
        page,
        size,
        total,
      };
    }

    const b = page * size;

    const result = temp.slice(a, b);

    return {
      result,
      page,
      size,
      total,
    };
  }
}

const list = [
  {
    email: 'leanne.gagnon@example.com',
    phone: 'M28 D84-2309',
    gender: 'female',
    name: 'Gagnon',
  },
  {
    email: 'lily.moore@example.com',
    phone: '0151 559 4631',
    gender: 'female',
    name: 'Moore',
  },
  {
    email: 'lillie.richards@example.com',
    phone: '(527) 626-2532',
    gender: 'female',
    name: 'Richards',
  },
  {
    email: 'gerta.demir@example.com',
    phone: '0017-8420426',
    gender: 'female',
    name: 'Demir',
  },
  {
    email: 'fekla.fartushnyak@example.com',
    phone: '(096) S10-2605',
    gender: 'female',
    name: 'Fartushnyak',
  },
  {
    email: 'noor.ostreng@example.com',
    phone: '28757632',
    gender: 'female',
    name: 'Østreng',
  },
  {
    email: 'arya.ege@example.com',
    phone: '37855643',
    gender: 'female',
    name: 'Ege',
  },
  {
    email: 'luisa.sanchez@example.com',
    phone: '991-224-126',
    gender: 'female',
    name: 'Sánchez',
  },
  {
    email: 'candice.hart@example.com',
    phone: '09-4422-8983',
    gender: 'female',
    name: 'Hart',
  },
  {
    email: 'sarah.wright@example.com',
    phone: '(219)-801-5476',
    gender: 'female',
    name: 'Wright',
  },
  {
    email: 'chinmayee.kulkarni@example.com',
    phone: '9737310523',
    gender: 'female',
    name: 'Kulkarni',
  },
  {
    email: 'harper.lee@example.com',
    phone: '(362)-498-4807',
    gender: 'female',
    name: 'Lee',
  },
  {
    email: 'margarita.pastor@example.com',
    phone: '992-048-590',
    gender: 'female',
    name: 'Pastor',
  },
  {
    email: 'milka.jovic@example.com',
    phone: '033-9391-720',
    gender: 'female',
    name: 'Jović',
  },
  {
    email: 'laerke.andersen@example.com',
    phone: '01394754',
    gender: 'female',
    name: 'Andersen',
  },
  {
    email: 'sedef.beserler@example.com',
    phone: '(116)-546-7190',
    gender: 'female',
    name: 'Beşerler',
  },
  {
    email: 'lea.petersen@example.com',
    phone: '84185279',
    gender: 'female',
    name: 'Petersen',
  },
  {
    email: 'tilde.blom@example.com',
    phone: '64784637',
    gender: 'female',
    name: 'Blom',
  },
  {
    email: 'andrea.olson@example.com',
    phone: '01252 35429',
    gender: 'female',
    name: 'Olson',
  },
  {
    email: 'bernice.miller@example.com',
    phone: '(312) 267-8292',
    gender: 'female',
    name: 'Miller',
  },
  {
    email: 'inger.kleiveland@example.com',
    phone: '82926643',
    gender: 'female',
    name: 'Kleiveland',
  },
  {
    email: 'khyn.slry@example.com',
    phone: '047-45966201',
    gender: 'female',
    name: 'سالاری',
  },
  {
    email: 'christina.murray@example.com',
    phone: '01-4659-9500',
    gender: 'female',
    name: 'Murray',
  },
  {
    email: 'aada.hamalainen@example.com',
    phone: '07-042-827',
    gender: 'female',
    name: 'Hamalainen',
  },
  {
    email: 'clea.roux@example.com',
    phone: '02-03-13-86-38',
    gender: 'female',
    name: 'Roux',
  },
  {
    email: 'charlie.french@example.com',
    phone: 'X22 P50-6193',
    gender: 'female',
    name: 'French',
  },
  {
    email: 'snezana.ognjanovic@example.com',
    phone: '034-3085-479',
    gender: 'female',
    name: 'Ognjanović',
  },
  {
    email: 'israa.poelsma@example.com',
    phone: '(058) 8199967',
    gender: 'female',
    name: 'Poelsma',
  },
  {
    email: 'suzana.nad@example.com',
    phone: '029-3333-892',
    gender: 'female',
    name: 'Nađ',
  },
  {
    email: 'drs.kmyrn@example.com',
    phone: '016-88836001',
    gender: 'female',
    name: 'كامياران',
  },
  {
    email: 'layla.jones@example.com',
    phone: '(028)-496-9329',
    gender: 'female',
    name: 'Jones',
  },
  {
    email: 'clara.johnson@example.com',
    phone: 'R76 J57-4180',
    gender: 'female',
    name: 'Johnson',
  },
  {
    email: 'vicky.shelton@example.com',
    phone: '021-050-7011',
    gender: 'female',
    name: 'Shelton',
  },
  {
    email: 'aynz.aalyzdh@example.com',
    phone: '040-33601592',
    gender: 'female',
    name: 'علیزاده',
  },
  {
    email: 'simone.solli@example.com',
    phone: '21861364',
    gender: 'female',
    name: 'Solli',
  },
  {
    email: 'evelyne.stohr@example.com',
    phone: '0986-5065183',
    gender: 'female',
    name: 'Stöhr',
  },
  {
    email: 'mia.dixon@example.com',
    phone: '(689) 336-9651',
    gender: 'female',
    name: 'Dixon',
  },
  {
    email: 'lily.gautier@example.com',
    phone: '01-61-85-16-76',
    gender: 'female',
    name: 'Gautier',
  },
  {
    email: 'dijana.jelacic@example.com',
    phone: '026-3168-837',
    gender: 'female',
    name: 'Jelačić',
  },
  {
    email: 'venla.wiitala@example.com',
    phone: '04-049-748',
    gender: 'female',
    name: 'Wiitala',
  },
  {
    email: 'lesa.garza@example.com',
    phone: '(866) 909-2136',
    gender: 'female',
    name: 'Garza',
  },
  {
    email: 'meenakshi.das@example.com',
    phone: '9635454163',
    gender: 'female',
    name: 'Das',
  },
  {
    email: 'sarita.dhamdhame@example.com',
    phone: '9051418686',
    gender: 'female',
    name: 'Dhamdhame',
  },
  {
    email: 'matea.vanveelen@example.com',
    phone: '(0563) 743820',
    gender: 'female',
    name: 'Van Veelen',
  },
  {
    email: 'donna.hamilton@example.com',
    phone: '051-886-9122',
    gender: 'female',
    name: 'Hamilton',
  },
  {
    email: 'delphine.young@example.com',
    phone: 'S74 J98-0024',
    gender: 'female',
    name: 'Young',
  },
  {
    email: 'teresa.perkins@example.com',
    phone: '01604 74450',
    gender: 'female',
    name: 'Perkins',
  },
  {
    email: 'amy.denys@example.com',
    phone: 'H34 Q01-3049',
    gender: 'female',
    name: 'Denys',
  },
  {
    email: 'justine.lo@example.com',
    phone: 'W54 S08-8877',
    gender: 'female',
    name: 'Lo',
  },
  {
    email: 'ilona.lakso@example.com',
    phone: '08-376-668',
    gender: 'female',
    name: 'Lakso',
  },
  {
    email: 'tara.natas@example.com',
    phone: '38019789',
    gender: 'female',
    name: 'Natås',
  },
  {
    email: 'zinayida.aleksiienko@example.com',
    phone: '(067) E37-8465',
    gender: 'female',
    name: 'Aleksiienko',
  },
  {
    email: 'zhdana.bandurko@example.com',
    phone: '(067) P14-4798',
    gender: 'female',
    name: 'Bandurko',
  },
  {
    email: 'fabiola.iglesias@example.com',
    phone: '(617) 649 9988',
    gender: 'female',
    name: 'Iglesias',
  },
  {
    email: 'charlotte.edwards@example.com',
    phone: '(263)-164-8971',
    gender: 'female',
    name: 'Edwards',
  },
  {
    email: 'aditya.prajapati@example.com',
    phone: '9061991366',
    gender: 'male',
    name: 'Prajapati',
  },
  {
    email: 'siloslav.atamanyuk@example.com',
    phone: '(098) O54-2017',
    gender: 'male',
    name: 'Atamanyuk',
  },
  {
    email: 'alfred.thomsen@example.com',
    phone: '65921198',
    gender: 'male',
    name: 'Thomsen',
  },
  {
    email: 'mio.stokkan@example.com',
    phone: '24566103',
    gender: 'male',
    name: 'Stokkan',
  },
  {
    email: 'radovan.tadic@example.com',
    phone: '025-7961-565',
    gender: 'male',
    name: 'Tadić',
  },
  {
    email: 'samuel.turner@example.com',
    phone: '(865)-815-7198',
    gender: 'male',
    name: 'Turner',
  },
  {
    email: 'ladislav.baltarovich@example.com',
    phone: '(097) J98-0548',
    gender: 'male',
    name: 'Baltarovich',
  },
  {
    email: 'anthony.bourgeois@example.com',
    phone: '04-29-16-95-38',
    gender: 'male',
    name: 'Bourgeois',
  },
  {
    email: 'john.harper@example.com',
    phone: '071-332-1089',
    gender: 'male',
    name: 'Harper',
  },
  {
    email: 'greg.bishop@example.com',
    phone: '021-560-9853',
    gender: 'male',
    name: 'Bishop',
  },
  {
    email: 'cooper.wang@example.com',
    phone: '(671)-662-1526',
    gender: 'male',
    name: 'Wang',
  },
  {
    email: 'gordiy.prihotko@example.com',
    phone: '(068) H13-6692',
    gender: 'male',
    name: 'Prihotko',
  },
  {
    email: 'velemir.shkoda@example.com',
    phone: '(096) R52-8068',
    gender: 'male',
    name: 'Shkoda',
  },
  {
    email: 'frederik.pedersen@example.com',
    phone: '27483524',
    gender: 'male',
    name: 'Pedersen',
  },
  {
    email: 'praneel.hiremath@example.com',
    phone: '9979786487',
    gender: 'male',
    name: 'Hiremath',
  },
  {
    email: 'gerald.berry@example.com',
    phone: '(592) 651-3571',
    gender: 'male',
    name: 'Berry',
  },
  {
    email: 'lambert.schrader@example.com',
    phone: '0379-3114783',
    gender: 'male',
    name: 'Schrader',
  },
  {
    email: 'oliver.brown@example.com',
    phone: '32033631',
    gender: 'male',
    name: 'Brown',
  },
  {
    email: 'advaith.bhardwaj@example.com',
    phone: '9031951067',
    gender: 'male',
    name: 'Bhardwaj',
  },
  {
    email: 'vistan.kashchuk@example.com',
    phone: '(098) T55-9221',
    gender: 'male',
    name: 'Kashchuk',
  },
  {
    email: 'joshua.wang@example.com',
    phone: '(215)-961-2160',
    gender: 'male',
    name: 'Wang',
  },
  {
    email: 'sebastian.vicente@example.com',
    phone: '984-784-553',
    gender: 'male',
    name: 'Vicente',
  },
  {
    email: 'bernfried.wortmann@example.com',
    phone: '0538-3904149',
    gender: 'male',
    name: 'Wortmann',
  },
  {
    email: 'karan.sullad@example.com',
    phone: '7642282217',
    gender: 'male',
    name: 'Sullad',
  },
  {
    email: 'esat.koc@example.com',
    phone: '(100)-250-4876',
    gender: 'male',
    name: 'Koç',
  },
  {
    email: 'darko.raden@example.com',
    phone: '026-9707-926',
    gender: 'male',
    name: 'Rađen',
  },
  {
    email: 'nathanael.garcia@example.com',
    phone: '05-09-87-26-64',
    gender: 'male',
    name: 'Garcia',
  },
  {
    email: 'andreas.andersen@example.com',
    phone: '31093325',
    gender: 'male',
    name: 'Andersen',
  },
  {
    email: 'mhmdth.rdyy@example.com',
    phone: '060-43856307',
    gender: 'male',
    name: 'رضایی',
  },
  {
    email: 'dan.duncan@example.com',
    phone: '02-6549-5812',
    gender: 'male',
    name: 'Duncan',
  },
  {
    email: 'keith.rose@example.com',
    phone: '01-1565-6354',
    gender: 'male',
    name: 'Rose',
  },
  {
    email: 'glib.bandurka@example.com',
    phone: '(067) K77-5759',
    gender: 'male',
    name: 'Bandurka',
  },
  {
    email: 'nedeljko.radanovic@example.com',
    phone: '038-2957-559',
    gender: 'male',
    name: 'Radanović',
  },
  {
    email: 'grimaldo.paredes@example.com',
    phone: '(687) 087 7597',
    gender: 'male',
    name: 'Paredes',
  },
  {
    email: 'louka.laurent@example.com',
    phone: '02-90-80-79-29',
    gender: 'male',
    name: 'Laurent',
  },
  {
    email: 'nikolaj.merker@example.com',
    phone: '0416-2060609',
    gender: 'male',
    name: 'Merker',
  },
  {
    email: 'daniel.mortensen@example.com',
    phone: '25631744',
    gender: 'male',
    name: 'Mortensen',
  },
  {
    email: 'nathaniel.austin@example.com',
    phone: '016977 9359',
    gender: 'male',
    name: 'Austin',
  },
  {
    email: 'yann.bourgeois@example.com',
    phone: '077 015 13 98',
    gender: 'male',
    name: 'Bourgeois',
  },
  {
    email: 'pwry.sdr@example.com',
    phone: '017-00541695',
    gender: 'male',
    name: 'صدر',
  },
  {
    email: 'amadis.pinto@example.com',
    phone: '(26) 6714-5485',
    gender: 'male',
    name: 'Pinto',
  },
  {
    email: 'snizhan.boreychuk@example.com',
    phone: '(067) P72-5527',
    gender: 'male',
    name: 'Boreychuk',
  },
  {
    email: 'oscar.guillaume@example.com',
    phone: '03-46-68-45-13',
    gender: 'male',
    name: 'Guillaume',
  },
  {
    email: 'prhm.kmyrn@example.com',
    phone: '059-73443884',
    gender: 'male',
    name: 'كامياران',
  },
  {
    email: 'jose.duncan@example.com',
    phone: '051-760-0981',
    gender: 'male',
    name: 'Duncan',
  },
  {
    email: 'xavier.barela@example.com',
    phone: '(691) 721 7778',
    gender: 'male',
    name: 'Barela',
  },
  {
    email: 'modesto.manzanares@example.com',
    phone: '(676) 549 0226',
    gender: 'male',
    name: 'Manzanares',
  },
  {
    email: 'tyrone.larson@example.com',
    phone: '04-4251-0137',
    gender: 'male',
    name: 'Larson',
  },
  {
    email: 'hudson.grewal@example.com',
    phone: 'X67 R90-0709',
    gender: 'male',
    name: 'Grewal',
  },
  {
    email: 'sm.mwswy@example.com',
    phone: '027-31541854',
    gender: 'male',
    name: 'موسوی',
  },
  {
    email: 'logan.cooper@example.com',
    phone: '(756)-522-8675',
    gender: 'male',
    name: 'Cooper',
  },
  {
    email: 'klaus-d..reichel@example.com',
    phone: '0313-0175366',
    gender: 'male',
    name: 'Reichel',
  },
  {
    email: 'selmer.bergseth@example.com',
    phone: '28983177',
    gender: 'male',
    name: 'Bergseth',
  },
  {
    email: 'pieke.spieker@example.com',
    phone: '(0678) 710667',
    gender: 'male',
    name: 'Spieker',
  },
  {
    email: 'hugo.white@example.com',
    phone: '(671)-083-5923',
    gender: 'male',
    name: 'White',
  },
];
