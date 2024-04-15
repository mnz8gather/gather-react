import { Controller, Get, Query } from '@nestjs/common';

@Controller('paradigm')
export class ParadigmController {
  @Get('/user')
  alpha(
    @Query('page') pageStr: string,
    @Query('size') sizeStr: string,
    @Query('gender') gender?: string,
    @Query('country') country?: string,
  ) {
    const page = parseInt(pageStr, 10);
    const size = parseInt(sizeStr, 10);
    let temp = list;
    if (gender) {
      temp = list.filter((item) => item.gender === gender);
    }
    if (country) {
      temp = temp.filter((item) => item.country === country);
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
    email: 'diana.brown@example.com',
    phone: '011-641-0732',
    gender: 'female',
    name: 'Brown',
    country: 'Ireland',
  },
  {
    email: 'miguelangel.veliz@example.com',
    phone: '(636) 066 4984',
    gender: 'male',
    name: 'Véliz',
    country: 'Mexico',
  },
  {
    email: 'tomislav.kralj@example.com',
    phone: '027-5649-043',
    gender: 'male',
    name: 'Kralj',
    country: 'Serbia',
  },
  {
    email: 'zvezdan.serbedzija@example.com',
    phone: '010-0389-420',
    gender: 'male',
    name: 'Šerbedžija',
    country: 'Serbia',
  },
  {
    email: 'andrej.lucas@example.com',
    phone: '077 654 97 14',
    gender: 'male',
    name: 'Lucas',
    country: 'Switzerland',
  },
  {
    email: 'mihajlo.ilic@example.com',
    phone: '020-0270-698',
    gender: 'male',
    name: 'Ilić',
    country: 'Serbia',
  },
  {
    email: 'florin.noel@example.com',
    phone: '078 353 52 75',
    gender: 'male',
    name: 'Noel',
    country: 'Switzerland',
  },
  {
    email: 'iida.haapala@example.com',
    phone: '06-387-459',
    gender: 'female',
    name: 'Haapala',
    country: 'Finland',
  },
  {
    email: 'devon.davis@example.com',
    phone: '(753) 297-4020',
    gender: 'male',
    name: 'Davis',
    country: 'United States',
  },
  {
    email: 'dhanush.andrade@example.com',
    phone: '8168652395',
    gender: 'male',
    name: 'Andrade',
    country: 'India',
  },
  {
    email: 'gul.basoglu@example.com',
    phone: '(583)-470-5767',
    gender: 'female',
    name: 'Başoğlu',
    country: 'Turkey',
  },
  {
    email: 'elizabeth.knight@example.com',
    phone: '(378) 855-4212',
    gender: 'female',
    name: 'Knight',
    country: 'United States',
  },
  {
    email: 'necati.turkyilmaz@example.com',
    phone: '(415)-188-6959',
    gender: 'male',
    name: 'Türkyılmaz',
    country: 'Turkey',
  },
  {
    email: 'sebastianus.vandenoudenalder@example.com',
    phone: '(006) 1529689',
    gender: 'male',
    name: 'Van den Oudenalder',
    country: 'Netherlands',
  },
  {
    email: 'marine.fleury@example.com',
    phone: '04-82-83-74-56',
    gender: 'female',
    name: 'Fleury',
    country: 'France',
  },
  {
    email: 'leevi.kyllo@example.com',
    phone: '05-559-576',
    gender: 'male',
    name: 'Kyllo',
    country: 'Finland',
  },
  {
    email: 'ysn.jaafry@example.com',
    phone: '005-53167834',
    gender: 'female',
    name: 'جعفری',
    country: 'Iran',
  },
  {
    email: 'madlen.schunk@example.com',
    phone: '0880-9987899',
    gender: 'female',
    name: 'Schunk',
    country: 'Germany',
  },
  {
    email: 'tobias.christiansen@example.com',
    phone: '92929215',
    gender: 'male',
    name: 'Christiansen',
    country: 'Denmark',
  },
  {
    email: 'lisa.hudson@example.com',
    phone: '021-160-2672',
    gender: 'female',
    name: 'Hudson',
    country: 'Ireland',
  },
  {
    email: 'kasper.salonen@example.com',
    phone: '08-293-517',
    gender: 'male',
    name: 'Salonen',
    country: 'Finland',
  },
  {
    email: 'rachel.hanson@example.com',
    phone: '(314) 576-1008',
    gender: 'female',
    name: 'Hanson',
    country: 'United States',
  },
  {
    email: 'john.weaver@example.com',
    phone: '06-4835-2361',
    gender: 'male',
    name: 'Weaver',
    country: 'Australia',
  },
  {
    email: 'flavio.portillo@example.com',
    phone: '(666) 218 3177',
    gender: 'male',
    name: 'Portillo',
    country: 'Mexico',
  },
  {
    email: 'musa.sloothaak@example.com',
    phone: '(0764) 374981',
    gender: 'male',
    name: 'Sloothaak',
    country: 'Netherlands',
  },
  {
    email: 'martina.bertrand@example.com',
    phone: '076 209 67 91',
    gender: 'female',
    name: 'Bertrand',
    country: 'Switzerland',
  },
  {
    email: 'jeremy.hendricks@example.com',
    phone: '0380-0272536',
    gender: 'male',
    name: 'Hendricks',
    country: 'Germany',
  },
  {
    email: 'niilo.karvonen@example.com',
    phone: '04-926-953',
    gender: 'male',
    name: 'Karvonen',
    country: 'Finland',
  },
  {
    email: 'mahe.renaud@example.com',
    phone: '04-45-11-62-47',
    gender: 'male',
    name: 'Renaud',
    country: 'France',
  },
  {
    email: 'emilie.knight@example.com',
    phone: 'D18 N78-0954',
    gender: 'female',
    name: 'Knight',
    country: 'Canada',
  },
  {
    email: 'sara.meehan@example.com',
    phone: '011-010-3394',
    gender: 'female',
    name: 'Meehan',
    country: 'Ireland',
  },
  {
    email: 'ana.jenkins@example.com',
    phone: '05-3110-2161',
    gender: 'female',
    name: 'Jenkins',
    country: 'Australia',
  },
  {
    email: 'fred.lawrence@example.com',
    phone: '013873 30575',
    gender: 'male',
    name: 'Lawrence',
    country: 'United Kingdom',
  },
  {
    email: 'phoebe.hall@example.com',
    phone: '(980)-517-6972',
    gender: 'female',
    name: 'Hall',
    country: 'New Zealand',
  },
  {
    email: 'emily.olsen@example.com',
    phone: '43950076',
    gender: 'female',
    name: 'Olsen',
    country: 'Denmark',
  },
  {
    email: 'jim.payne@example.com',
    phone: '04-6218-0401',
    gender: 'male',
    name: 'Payne',
    country: 'Australia',
  },
  {
    email: 'stephen.helm@example.com',
    phone: '0049-7481133',
    gender: 'male',
    name: 'Helm',
    country: 'Germany',
  },
  {
    email: 'luca.kjaervik@example.com',
    phone: '50115761',
    gender: 'female',
    name: 'Kjærvik',
    country: 'Norway',
  },
  {
    email: 'sjoert.lambooij@example.com',
    phone: '(098) 1280888',
    gender: 'male',
    name: 'Lambooij',
    country: 'Netherlands',
  },
  {
    email: 'dinora.lopes@example.com',
    phone: '(54) 8431-6840',
    gender: 'female',
    name: 'Lopes',
    country: 'Brazil',
  },
  {
    email: 'krista.rombach@example.com',
    phone: '0587-8985048',
    gender: 'female',
    name: 'Rombach',
    country: 'Germany',
  },
  {
    email: 'alexandra.jones@example.com',
    phone: '(963)-522-9116',
    gender: 'female',
    name: 'Jones',
    country: 'New Zealand',
  },
  {
    email: 'emma.bergeron@example.com',
    phone: 'O46 K70-6163',
    gender: 'female',
    name: 'Bergeron',
    country: 'Canada',
  },
  {
    email: 'aleksije.vuksanovic@example.com',
    phone: '018-4125-110',
    gender: 'male',
    name: 'Vuksanović',
    country: 'Serbia',
  },
  {
    email: 'ethan.zhang@example.com',
    phone: '(515)-322-1859',
    gender: 'male',
    name: 'Zhang',
    country: 'New Zealand',
  },
  {
    email: 'tony.wells@example.com',
    phone: '(565) 454-5499',
    gender: 'male',
    name: 'Wells',
    country: 'United States',
  },
  {
    email: 'katherine.flores@example.com',
    phone: '041-413-8232',
    gender: 'female',
    name: 'Flores',
    country: 'Ireland',
  },
  {
    email: 'lauren.gardner@example.com',
    phone: '01-1981-7636',
    gender: 'female',
    name: 'Gardner',
    country: 'Australia',
  },
  {
    email: 'elena.luna@example.com',
    phone: '(647) 775 6537',
    gender: 'female',
    name: 'Luna',
    country: 'Mexico',
  },
  {
    email: 'nanci.teixeira@example.com',
    phone: '(01) 5712-7243',
    gender: 'female',
    name: 'Teixeira',
    country: 'Brazil',
  },
  {
    email: 'ines.roy@example.com',
    phone: '075 269 58 95',
    gender: 'female',
    name: 'Roy',
    country: 'Switzerland',
  },
  {
    email: 'veera.valli@example.com',
    phone: '07-768-558',
    gender: 'female',
    name: 'Valli',
    country: 'Finland',
  },
  {
    email: 'theodor.vidal@example.com',
    phone: '079 513 94 68',
    gender: 'male',
    name: 'Vidal',
    country: 'Switzerland',
  },
  {
    email: 'flynn.frank@example.com',
    phone: '(0349) 961023',
    gender: 'male',
    name: 'Frank',
    country: 'Netherlands',
  },
  {
    email: 'tobias.poulsen@example.com',
    phone: '03312859',
    gender: 'male',
    name: 'Poulsen',
    country: 'Denmark',
  },
];
