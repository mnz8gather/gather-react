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

    const n = (page + 1) * size;

    if (n > total) {
      return {
        result: [],
        page,
        size,
        total,
      };
    }

    const a = (page - 1) * size;
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
];
