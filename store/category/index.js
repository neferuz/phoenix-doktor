import { groupBy, cloneDeep } from 'lodash-es'

function compareFunc() {
  return function (a, b) {
    const nameA = a.name
    const nameB = b.name
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
  }
}

const state = {
  categories: [
        {
            "id": 1,
            "target": "doctor",
            "name": "Врачи",
            "slug": "doctors",
            "icon": null,
            "children": [
                {
                    "id": 12,
                    "target": "doctor",
                    "name": "Эндокринолог",
                    "slug": "endokrinolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 13,
                    "target": "doctor",
                    "name": "Лор",
                    "slug": "lor",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 14,
                    "target": "doctor",
                    "name": "Терапевт",
                    "slug": "terapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 15,
                    "target": "doctor",
                    "name": "Гинеколог",
                    "slug": "ginekolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 16,
                    "target": "doctor",
                    "name": "Маммолог",
                    "slug": "mammolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 22,
                    "target": "doctor",
                    "name": "Глазной врач",
                    "slug": "glaznoy-vrach",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 17,
                    "target": "doctor",
                    "name": "Детский невропатолог",
                    "slug": "detskiy-nevropatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 18,
                    "target": "doctor",
                    "name": "Невролог",
                    "slug": "nevrolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 19,
                    "target": "doctor",
                    "name": "Уролог",
                    "slug": "urolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 20,
                    "target": "doctor",
                    "name": "Узист",
                    "slug": "uzist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 21,
                    "target": "doctor",
                    "name": "Психоневролог",
                    "slug": "psihonevrolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 23,
                    "target": "doctor",
                    "name": "Травматолог",
                    "slug": "travmatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 24,
                    "target": "doctor",
                    "name": "Вертебролог",
                    "slug": "vertebrolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 25,
                    "target": "doctor",
                    "name": "Ортопед",
                    "slug": "ortoped",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 26,
                    "target": "doctor",
                    "name": "Инфекционист",
                    "slug": "infektsionist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 27,
                    "target": "doctor",
                    "name": "Кардиолог",
                    "slug": "kardiolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 28,
                    "target": "doctor",
                    "name": "Аллерголог",
                    "slug": "allergolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 29,
                    "target": "doctor",
                    "name": "Стоматолог",
                    "slug": "stomatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 30,
                    "target": "doctor",
                    "name": "Дерматолог",
                    "slug": "dermatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 31,
                    "target": "doctor",
                    "name": "Логопед",
                    "slug": "logoped",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 32,
                    "target": "doctor",
                    "name": "Гастроэнтеролог",
                    "slug": "gastroenterolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 33,
                    "target": "doctor",
                    "name": "Кожвенеролог",
                    "slug": "kozhvenerolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 34,
                    "target": "doctor",
                    "name": "Дефектолог",
                    "slug": "defektolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 63,
                    "target": "doctor",
                    "name": "Дерматоонколог",
                    "slug": "dermatoonkolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 35,
                    "target": "doctor",
                    "name": "Ортодонт",
                    "slug": "ortodont",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 36,
                    "target": "doctor",
                    "name": "Детский стоматолог",
                    "slug": "detskiy-stomatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 37,
                    "target": "doctor",
                    "name": "Рентгенолог",
                    "slug": "rentgenolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 38,
                    "target": "doctor",
                    "name": "Фиброскан-специалист",
                    "slug": "fibroskan-spetsialist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 39,
                    "target": "doctor",
                    "name": "Кардиоревматолог",
                    "slug": "kardiorevmatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 40,
                    "target": "doctor",
                    "name": "Детский гинеколог",
                    "slug": "detskiy-ginekolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 41,
                    "target": "doctor",
                    "name": "Репродуктолог",
                    "slug": "reproduktolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 42,
                    "target": "doctor",
                    "name": "Эмбриолог",
                    "slug": "embriolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 43,
                    "target": "doctor",
                    "name": "Пульмонолог",
                    "slug": "pulymonolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 44,
                    "target": "doctor",
                    "name": "Ревматолог",
                    "slug": "revmatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 45,
                    "target": "doctor",
                    "name": "Эндоскопист",
                    "slug": "endoskopist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 46,
                    "target": "doctor",
                    "name": "Физиотерапевт",
                    "slug": "fizioterapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 47,
                    "target": "doctor",
                    "name": "Андролог",
                    "slug": "androlog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 48,
                    "target": "doctor",
                    "name": "Трихолог",
                    "slug": "triholog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 49,
                    "target": "doctor",
                    "name": "Косметолог",
                    "slug": "kosmetolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 50,
                    "target": "doctor",
                    "name": "Массажист",
                    "slug": "massazhist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 51,
                    "target": "doctor",
                    "name": "Валеолог",
                    "slug": "valeolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 52,
                    "target": "doctor",
                    "name": "Радиолог",
                    "slug": "radiolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 53,
                    "target": "doctor",
                    "name": "Детский кардиоревматолог",
                    "slug": "detskiy-kardiorevmatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 54,
                    "target": "doctor",
                    "name": "Педиатр",
                    "slug": "pediatr",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 55,
                    "target": "doctor",
                    "name": "Невропатолог",
                    "slug": "nevropatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 56,
                    "target": "doctor",
                    "name": "Детский невролог",
                    "slug": "detskiy-nevrolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 57,
                    "target": "doctor",
                    "name": "Хирург",
                    "slug": "hirurg",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 58,
                    "target": "doctor",
                    "name": "Иммунолог",
                    "slug": "immunolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 59,
                    "target": "doctor",
                    "name": "Дерматовенеролог",
                    "slug": "dermatovenerolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 60,
                    "target": "doctor",
                    "name": "Микробиолог",
                    "slug": "mikrobiolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 61,
                    "target": "doctor",
                    "name": "Миколог",
                    "slug": "mikolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 62,
                    "target": "doctor",
                    "name": "Проктолог",
                    "slug": "proktolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 64,
                    "target": "doctor",
                    "name": "Онколог",
                    "slug": "onkolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 65,
                    "target": "doctor",
                    "name": "Онкогинеколог",
                    "slug": "onkoginekolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 66,
                    "target": "doctor",
                    "name": "Онкохирург",
                    "slug": "onkohirurg",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 67,
                    "target": "doctor",
                    "name": "Сексопатолог",
                    "slug": "seksopatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 68,
                    "target": "doctor",
                    "name": "Эпилептолог",
                    "slug": "epileptolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 69,
                    "target": "doctor",
                    "name": "Оториноларинголог",
                    "slug": "otorinolaringolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 70,
                    "target": "doctor",
                    "name": "Психиатр",
                    "slug": "psihiatr",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 71,
                    "target": "doctor",
                    "name": "Генетик",
                    "slug": "genetik",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 84,
                    "target": "doctor",
                    "name": "Паразитолог",
                    "slug": "parazitolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 72,
                    "target": "doctor",
                    "name": "Вегетолог",
                    "slug": "vegetolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 73,
                    "target": "doctor",
                    "name": "Детский массажист ",
                    "slug": "detskiy-massazhist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 74,
                    "target": "doctor",
                    "name": "Пластический хирург",
                    "slug": "plasticheskiy-hirurg",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 75,
                    "target": "doctor",
                    "name": "Дерматокосметолог",
                    "slug": "dermatokosmetolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 85,
                    "target": "doctor",
                    "name": "Акушер-гинеколог",
                    "slug": "akusher-ginekolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 76,
                    "target": "doctor",
                    "name": "Иглотерапевт",
                    "slug": "igloterapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 77,
                    "target": "doctor",
                    "name": "Кардиохирург",
                    "slug": "kardiohirurg",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 78,
                    "target": "doctor",
                    "name": "Флеболог",
                    "slug": "flebolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 79,
                    "target": "doctor",
                    "name": "Онкодерматолог",
                    "slug": "onkodermatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 80,
                    "target": "doctor",
                    "name": "Артролог",
                    "slug": "artrolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 81,
                    "target": "doctor",
                    "name": "Гепатолог",
                    "slug": "gepatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 82,
                    "target": "doctor",
                    "name": "Нейрофизиолог",
                    "slug": "neyrofiziolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 83,
                    "target": "doctor",
                    "name": "Гематолог",
                    "slug": "gematolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 86,
                    "target": "doctor",
                    "name": "МРТ-специалист",
                    "slug": "mrt-spetsialist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 87,
                    "target": "doctor",
                    "name": "МСКТ-специалист",
                    "slug": "mskt-spetsialist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 88,
                    "target": "doctor",
                    "name": "Анестезиолог",
                    "slug": "anesteziolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 89,
                    "target": "doctor",
                    "name": "Реаниматолог",
                    "slug": "reanimatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 90,
                    "target": "doctor",
                    "name": "Врач функциональной диагностики",
                    "slug": "vrach-funktsionalynoy-diagnostiki",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 91,
                    "target": "doctor",
                    "name": "Эндоуролог",
                    "slug": "endourolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 92,
                    "target": "doctor",
                    "name": "Нарколог",
                    "slug": "narkolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 93,
                    "target": "doctor",
                    "name": "Офтальмолог",
                    "slug": "oftalymolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 94,
                    "target": "doctor",
                    "name": "Окулист",
                    "slug": "okulist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 95,
                    "target": "doctor",
                    "name": "Кольпоскопист",
                    "slug": "kolyposkopist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 96,
                    "target": "doctor",
                    "name": "Гастроскопист",
                    "slug": "gastroskopist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 97,
                    "target": "doctor",
                    "name": "Нефролог",
                    "slug": "nefrolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 98,
                    "target": "doctor",
                    "name": "Подиатр",
                    "slug": "podiatr",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 99,
                    "target": "doctor",
                    "name": "Неонатолог",
                    "slug": "neonatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 100,
                    "target": "doctor",
                    "name": "Детский травматолог",
                    "slug": "detskiy-travmatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 101,
                    "target": "doctor",
                    "name": "Трансплантолог",
                    "slug": "transplantolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 102,
                    "target": "doctor",
                    "name": "Детский терапевт",
                    "slug": "detskiy-terapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 103,
                    "target": "doctor",
                    "name": "Аритмолог",
                    "slug": "aritmolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 104,
                    "target": "doctor",
                    "name": "Остеопат",
                    "slug": "osteopat",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 105,
                    "target": "doctor",
                    "name": "Детский реабилитолог",
                    "slug": "detskiy-reabilitolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 106,
                    "target": "doctor",
                    "name": "Реабилитолог",
                    "slug": "reabilitolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 107,
                    "target": "doctor",
                    "name": "Онкопроктолог",
                    "slug": "onkoproktolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 108,
                    "target": "doctor",
                    "name": "Подолог",
                    "slug": "podolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 109,
                    "target": "doctor",
                    "name": "Нейрохирург",
                    "slug": "neyrohirurg",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 110,
                    "target": "doctor",
                    "name": "Кардиореаниматолог",
                    "slug": "kardioreanimatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 111,
                    "target": "doctor",
                    "name": "Кардиографист",
                    "slug": "kardiografist",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 112,
                    "target": "doctor",
                    "name": "Психолог",
                    "slug": "psiholog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 113,
                    "target": "doctor",
                    "name": "Онкоуролог",
                    "slug": "onkourolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 115,
                    "target": "doctor",
                    "name": "Имплантолог",
                    "slug": "implantolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 116,
                    "target": "doctor",
                    "name": "Кинезиолог",
                    "slug": "kineziolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 117,
                    "target": "doctor",
                    "name": "Нейрореаниматолог",
                    "slug": "neyroreanimatolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 118,
                    "target": "doctor",
                    "name": "Нейроуролог",
                    "slug": "neyrourolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 119,
                    "target": "doctor",
                    "name": "Онкоофтальмолог",
                    "slug": "onkooftalmolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 120,
                    "target": "doctor",
                    "name": "Детский офтальмолог",
                    "slug": "detskiy-oftalmolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 121,
                    "target": "doctor",
                    "name": "Сомнолог",
                    "slug": "Somnolog",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 122,
                    "target": "doctor",
                    "name": "Кинезитерапевт",
                    "slug": "Kineziterapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 123,
                    "target": "doctor",
                    "name": "Гирудотерапевт",
                    "slug": "Girudoterapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 124,
                    "target": "doctor",
                    "name": "Психотерапевт",
                    "slug": "Psixoterapevt",
                    "icon": null,
                    "children": []
                },
                {
                    "id": 125,
                    "target": "doctor",
                    "name": "Нейропсихолог",
                    "slug": "Neyropsixolog",
                    "icon": null,
                    "children": []
                }
            ]
        },
        {
            "id": 2,
            "target": "organization",
            "name": "Процедуры",
            "slug": "procedures",
            "icon": null,
            "children": [
                {
                    "id": 363,
                    "target": "organization",
                    "name": "Зубы?",
                    "slug": "zubi?",
                    "icon": "p_7.svg",
                    "children": [
                        {
                            "id": 365,
                            "target": "organization",
                            "name": "Чистка зубов",
                            "slug": "chistka-zubov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 364,
                            "target": "organization",
                            "name": "Лечение кариеса",
                            "slug": "lechenie-kariesa",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 366,
                            "target": "organization",
                            "name": "Удаление зуба",
                            "slug": "udalenie-zuba",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 367,
                            "target": "organization",
                            "name": "Установка брекетов",
                            "slug": "ustanovka-breketov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 368,
                            "target": "organization",
                            "name": "Установка импланта",
                            "slug": "ustanovka-implanta",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 369,
                            "target": "organization",
                            "name": "Отбеливание зубов",
                            "slug": "otbelivanie-zubov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 370,
                            "target": "organization",
                            "name": "Реставрация зуба",
                            "slug": "restavratsiya-zuba",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 371,
                            "target": "organization",
                            "name": "Установка пломбы",
                            "slug": "ustanovka-plombi",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 372,
                    "target": "organization",
                    "name": "Глаза?",
                    "slug": "glaza",
                    "icon": "p_4.svg",
                    "children": [
                        {
                            "id": 373,
                            "target": "organization",
                            "name": "Промывание слезных путей",
                            "slug": "promivanie-sleznih-putey",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 374,
                            "target": "organization",
                            "name": "УЗИ глаз",
                            "slug": "uzi-glaz",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 375,
                            "target": "organization",
                            "name": "Первичный осмотр",
                            "slug": "pervichniy-osmotr",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 376,
                            "target": "organization",
                            "name": "Измерение глазного давления",
                            "slug": "izmerenie-glaznogo-davleniya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 377,
                            "target": "organization",
                            "name": "Лазерное лечение глаз",
                            "slug": "lazernoe-lechenie-glaz",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 378,
                            "target": "organization",
                            "name": "Подбор очков",
                            "slug": "podbor-ochkov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 379,
                            "target": "organization",
                            "name": "Лечение косоглазия",
                            "slug": "lechenie-kosoglaziya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 380,
                            "target": "organization",
                            "name": "Компьютерная томография глаза",
                            "slug": "kompyyuternaya-tomografiya-glaza",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 381,
                            "target": "organization",
                            "name": "Хирургическое лечение катаракты",
                            "slug": "hirurgicheskoe-lechenie-katarakti",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 382,
                            "target": "organization",
                            "name": "Хирургическое лечение глаукомы",
                            "slug": "hirurgicheskoe-lechenie-glaukomi",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 384,
                    "target": "organization",
                    "name": "Общая диагностика?",
                    "slug": "obshtaya-diagnostika?",
                    "icon": "p_15.svg",
                    "children": [
                        {
                            "id": 385,
                            "target": "organization",
                            "name": "УЗИ",
                            "slug": "uzi",
                            "icon": null,
                            "children": [
                                {
                                    "id": 386,
                                    "target": "organization",
                                    "name": "УЗИ щитовидной железы",
                                    "slug": "uzi-shtitovidnoy-zhelezi",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 387,
                                    "target": "organization",
                                    "name": "УЗИ поджелудочной железы",
                                    "slug": "uzi-podzheludochnoy-zhelezi",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 388,
                                    "target": "organization",
                                    "name": "УЗИ селезенки",
                                    "slug": "uzi-selezenki",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 389,
                                    "target": "organization",
                                    "name": "УЗИ органов брюшной полости",
                                    "slug": "uzi-organov-bryushnoy-polosti",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 390,
                                    "target": "organization",
                                    "name": "УЗИ почек и мочевого пузыря",
                                    "slug": "uzi-pochek-i-mochevogo-puzirya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 391,
                                    "target": "organization",
                                    "name": "УЗИ органов малого таза",
                                    "slug": "uzi-organov-malovogo-taza",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 392,
                                    "target": "organization",
                                    "name": "УЗИ печени и желчного пузыря",
                                    "slug": "uzi-pecheni-i-zhelchnogo-puzirya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 393,
                                    "target": "organization",
                                    "name": "УЗИ мягких тканей",
                                    "slug": "uzi-myagkih-tkaney",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 394,
                                    "target": "organization",
                                    "name": "УЗИ лимфатических узлов",
                                    "slug": "uzi-limfaticheskih-uzlov",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 395,
                            "target": "organization",
                            "name": "Доплер",
                            "slug": "dopler",
                            "icon": null,
                            "children": [
                                {
                                    "id": 397,
                                    "target": "organization",
                                    "name": "Доплер щитовидной железы",
                                    "slug": "dopler-shtitovidnoy-zhelezi",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 396,
                                    "target": "organization",
                                    "name": "Доплер сосудов почек",
                                    "slug": "dopler-sosudov-pochek",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 398,
                                    "target": "organization",
                                    "name": "Доплер сосудов брюшной полости",
                                    "slug": "dopler-sosudov-bryushnoy-polosti",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 399,
                            "target": "organization",
                            "name": "Компьютерная томография",
                            "slug": "kompyyuternaya-tomografiya",
                            "icon": null,
                            "children": [
                                {
                                    "id": 400,
                                    "target": "organization",
                                    "name": "Компьютерная томография верхней и нижней челюсти",
                                    "slug": "kompyuternaya-tomografiya-verhney-i-nizhney-chelyusti",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 401,
                                    "target": "organization",
                                    "name": "Компьютерная томография гайморовой и лобной пазухи",
                                    "slug": "kompyuternaya-tomografiya-gaymorovoy-i-lobnoy-pazuhi",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 402,
                                    "target": "organization",
                                    "name": "Компьютерная томография носовой перегородки",
                                    "slug": "kompyuternaya-tomografiya-nosovoy-peregorodki",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 403,
                                    "target": "organization",
                                    "name": "Компьютерная томография височной кости",
                                    "slug": "kompyuternaya-tomografiya-visechnoy-kosti",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 404,
                            "target": "organization",
                            "name": "МРТ",
                            "slug": "mrt",
                            "icon": null,
                            "children": [
                                {
                                    "id": 406,
                                    "target": "organization",
                                    "name": "МРТ брюшной полости",
                                    "slug": "mrt-bryushnoy-polosti",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 405,
                                    "target": "organization",
                                    "name": "МРТ гипофиза",
                                    "slug": "mrt-gipofiza",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 407,
                                    "target": "organization",
                                    "name": "МРТ малого таза",
                                    "slug": "mrt-malovogo-taza",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 408,
                                    "target": "organization",
                                    "name": "МРТ сустава",
                                    "slug": "mrt-sustava",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 409,
                                    "target": "organization",
                                    "name": "Открытый аппарат МРТ",
                                    "slug": "otkritiy-apparat-mrt",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 410,
                            "target": "organization",
                            "name": "МСКТ",
                            "slug": "mskt",
                            "icon": null,
                            "children": [
                                {
                                    "id": 413,
                                    "target": "organization",
                                    "name": "МСКТ надпочечников",
                                    "slug": "mskt-nadpochechnikov",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 411,
                                    "target": "organization",
                                    "name": "МСКТ брюшной полости",
                                    "slug": "mskt-bryushnoy-polosti",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 412,
                                    "target": "organization",
                                    "name": "МСКТ малого таза",
                                    "slug": "mskt-malovogo-taza",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 414,
                                    "target": "organization",
                                    "name": "МСКТ почек",
                                    "slug": "mskt-pochek",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 415,
                                    "target": "organization",
                                    "name": "МСКТ суставов",
                                    "slug": "mskt-sustavov",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 419,
                            "target": "organization",
                            "name": "Гастроскопия",
                            "slug": "gastroskopiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 416,
                            "target": "organization",
                            "name": "Рентген",
                            "slug": "rentgen",
                            "icon": null,
                            "children": [
                                {
                                    "id": 417,
                                    "target": "organization",
                                    "name": "Рентген суставов",
                                    "slug": "rentgen-sustavov",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 418,
                                    "target": "organization",
                                    "name": "Рентген костей",
                                    "slug": "rentgen-kostey",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 420,
                            "target": "organization",
                            "name": "Электромиография",
                            "slug": "elektromiografiya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 421,
                    "target": "organization",
                    "name": "Сердце❤️",
                    "slug": "serdtse️",
                    "icon": "p_17.svg",
                    "children": [
                        {
                            "id": 422,
                            "target": "organization",
                            "name": "ЭКГ",
                            "slug": "ekg",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 424,
                            "target": "organization",
                            "name": "УЗИ сердца",
                            "slug": "uzi-serdtsa",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 423,
                            "target": "organization",
                            "name": "Ритмограмма",
                            "slug": "ritmogramma",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 425,
                            "target": "organization",
                            "name": "Лечение аритмии",
                            "slug": "lechenie-aritmii",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 426,
                            "target": "organization",
                            "name": "Установка монитора",
                            "slug": "ustanovka-monitora",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 428,
                            "target": "organization",
                            "name": "Коронарография",
                            "slug": "koronarografiya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 447,
                    "target": "organization",
                    "name": "Мужское здоровье??",
                    "slug": "muzhskoe-zdorovye",
                    "icon": "p_13.svg",
                    "children": [
                        {
                            "id": 448,
                            "target": "organization",
                            "name": "УЗИ предстательной железы",
                            "slug": "uzi-predstatelynoy-zhelezi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 449,
                            "target": "organization",
                            "name": "УЗИ органов мошонки",
                            "slug": "uzi-ogranov-moshonki",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 450,
                            "target": "organization",
                            "name": "Доплер органов мошонки",
                            "slug": "dopler-organov-moshonki",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 451,
                            "target": "organization",
                            "name": "Доплер предстательной железы",
                            "slug": "dopler-predstatelynoy-zhelezi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 452,
                            "target": "organization",
                            "name": "Уретрограмма",
                            "slug": "uretrogramma",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 453,
                            "target": "organization",
                            "name": "Недержание мочи",
                            "slug": "siydikni-tutmaslik",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 429,
                    "target": "organization",
                    "name": "Голова?",
                    "slug": "golova",
                    "icon": "p_3.svg",
                    "children": [
                        {
                            "id": 430,
                            "target": "organization",
                            "name": "ЭXO ЭГ",
                            "slug": "exo-eg",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 431,
                            "target": "organization",
                            "name": "ЭЭГ",
                            "slug": "eeg",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 432,
                            "target": "organization",
                            "name": "МРТ головного мозга",
                            "slug": "mrt-golovnogo-mozga",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 433,
                            "target": "organization",
                            "name": "МСКТ головного мозга",
                            "slug": "mskt-golovnogo-mozga",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 434,
                            "target": "organization",
                            "name": "Рентген черепа",
                            "slug": "rentgen-cherepa",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 435,
                    "target": "organization",
                    "name": "Женское здоровье??",
                    "slug": "zhenskoe-zdorovye",
                    "icon": "p_6.svg",
                    "children": [
                        {
                            "id": 436,
                            "target": "organization",
                            "name": "Кольпоскопия",
                            "slug": "kolyposkopiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 438,
                            "target": "organization",
                            "name": "Фолликулометрия",
                            "slug": "follikulometriya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 437,
                            "target": "organization",
                            "name": "Доплер плода",
                            "slug": "dopler-ploda",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 439,
                            "target": "organization",
                            "name": "УЗИ матки и яичников",
                            "slug": "uzi-matki-i-yaichnikov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 441,
                            "target": "organization",
                            "name": "Скрининг плода",
                            "slug": "skrining-ploda",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 440,
                            "target": "organization",
                            "name": "УЗИ беременности",
                            "slug": "uzi-beremennosti",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 442,
                            "target": "organization",
                            "name": "УЗИ молочных желез",
                            "slug": "uzi-molochnih-zhelez",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 443,
                            "target": "organization",
                            "name": "Маммография",
                            "slug": "mammografiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 444,
                            "target": "organization",
                            "name": "ЭХО КГ плода",
                            "slug": "eho-kg-ploda",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 445,
                            "target": "organization",
                            "name": "Недержание мочи",
                            "slug": "nederzhanie-mochi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 446,
                            "target": "organization",
                            "name": "Гистероскопия",
                            "slug": "gisteroskopiya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 454,
                    "target": "organization",
                    "name": "Волосы??",
                    "slug": "volosi",
                    "icon": "p_2.svg",
                    "children": [
                        {
                            "id": 455,
                            "target": "organization",
                            "name": "Фототрихограмма",
                            "slug": "fototrihogramma",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 456,
                            "target": "organization",
                            "name": "Трихоскопия",
                            "slug": "trihoskopiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 457,
                            "target": "organization",
                            "name": "Трихопигментация",
                            "slug": "trihopigmentatsiya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 459,
                    "target": "organization",
                    "name": "Позвоночник??",
                    "slug": "pozvonochnik",
                    "icon": "p_16.svg",
                    "children": [
                        {
                            "id": 460,
                            "target": "organization",
                            "name": "МРТ шейного отдела позвоночника",
                            "slug": "mrt-sheynogo-otdela-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 461,
                            "target": "organization",
                            "name": "МРТ грудного отдела позвоночника",
                            "slug": "mrt-grudnogo-otdela-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 462,
                            "target": "organization",
                            "name": "МРТ пояснично-крестцового отдела позвоночника",
                            "slug": "mrt-poyasnichno-kresttsovogo-otdela-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 463,
                            "target": "organization",
                            "name": "МСКТ позвоночника",
                            "slug": "mskt-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 464,
                            "target": "organization",
                            "name": "Рентген позвоночника",
                            "slug": "rentgen-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 465,
                            "target": "organization",
                            "name": "Вытяжение позвоночника",
                            "slug": "vityazhenie-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 466,
                            "target": "organization",
                            "name": "Реабилитация межпозвоночных грыж",
                            "slug": "reabilitatsiya-mezhpozvonochnih-grizh",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 467,
                            "target": "organization",
                            "name": "Удаление грыжи диска",
                            "slug": "udalenie-grizhi-diska",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 468,
                            "target": "organization",
                            "name": "Статико-динамические исследования позвоночника",
                            "slug": "statiko-dinamicheskie-issledovaniya-pozvonochnika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 469,
                            "target": "organization",
                            "name": "Диагностика опорно-двигательного аппарата",
                            "slug": "diagnostika-oporno-dvigatelynogo-apparata",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 470,
                    "target": "organization",
                    "name": "Сосуды и вены?",
                    "slug": "sosudi-i-veni",
                    "icon": "p_18.svg",
                    "children": [
                        {
                            "id": 471,
                            "target": "organization",
                            "name": "Доплер сосудов конечностей",
                            "slug": "dopler-sosudov-konechnostey",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 472,
                            "target": "organization",
                            "name": "Доплер вен конечностей",
                            "slug": "dopler-ven-konechnostey",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 473,
                            "target": "organization",
                            "name": "Доплер брахиоцефальных сосудов",
                            "slug": "dopler-brahiotsefalynih-sosudov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 474,
                            "target": "organization",
                            "name": "Склеротерапия",
                            "slug": "skleroterapiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 475,
                            "target": "organization",
                            "name": "МСКТ сосудов",
                            "slug": "mskt-sosudov",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 476,
                    "target": "organization",
                    "name": "Наркомания и алкоголизм?",
                    "slug": "narkomaniya-i-alkogolizm",
                    "icon": "p_14.svg",
                    "children": [
                        {
                            "id": 477,
                            "target": "organization",
                            "name": "Лечение алкоголизма",
                            "slug": "lechenie-alkogolizma",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 478,
                            "target": "organization",
                            "name": "Лечение наркомании",
                            "slug": "lechenie-narkomanii",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 479,
                            "target": "organization",
                            "name": "Кодирование от табакокурения",
                            "slug": "kodirovanie-ot-tabakokureniya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 480,
                    "target": "organization",
                    "name": "Легкие?",
                    "slug": "legkie",
                    "icon": "p_12.svg",
                    "children": [
                        {
                            "id": 481,
                            "target": "organization",
                            "name": "МСКТ грудной клетки",
                            "slug": "mskt-grudnoy-kletki",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 482,
                            "target": "organization",
                            "name": "Рентген грудной клетки",
                            "slug": "rentgen-grudnoy-kletki",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 483,
                    "target": "organization",
                    "name": "Хирургические операции✂️",
                    "slug": "hirurgicheskie-operatsii️",
                    "icon": null,
                    "children": [
                        {
                            "id": 484,
                            "target": "organization",
                            "name": "Пластическая хирургия?",
                            "slug": "plasticheskaya-hirurgiya",
                            "icon": null,
                            "children": [
                                {
                                    "id": 485,
                                    "target": "organization",
                                    "name": "Блефаропластика",
                                    "slug": "blefaroplastika",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 486,
                                    "target": "organization",
                                    "name": "Подтяжка лица",
                                    "slug": "podtyazhka-litsa",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 492,
                                    "target": "organization",
                                    "name": "Пластика живота",
                                    "slug": "plastika-zhivota",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 487,
                                    "target": "organization",
                                    "name": "Пластика ушей",
                                    "slug": "plastika-ushey",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 489,
                                    "target": "organization",
                                    "name": "Ринопластика",
                                    "slug": "rinoplastika",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 488,
                                    "target": "organization",
                                    "name": "Пластика губ",
                                    "slug": "plastika-gub",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 490,
                                    "target": "organization",
                                    "name": "Пластика груди",
                                    "slug": "plastika-grudi",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 491,
                                    "target": "organization",
                                    "name": "Пластика ягодиц",
                                    "slug": "plastika-yagodits",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 493,
                                    "target": "organization",
                                    "name": "Интимная пластика",
                                    "slug": "intimnaya-plastika",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 494,
                                            "target": "organization",
                                            "name": "Женская интимная пластика",
                                            "slug": "zhenskaya-intimnaya-plastika",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 495,
                                            "target": "organization",
                                            "name": "Мужская интимная пластика",
                                            "slug": "muzhskaya-intimnaya-plastika",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": 496,
                                    "target": "organization",
                                    "name": "Липосакция",
                                    "slug": "liposaktsiya",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 497,
                            "target": "organization",
                            "name": "Лечебная хирургия??‍⚕️",
                            "slug": "lechebnaya-hirurgiya‍️",
                            "icon": null,
                            "children": [
                                {
                                    "id": 498,
                                    "target": "organization",
                                    "name": "Стентирование",
                                    "slug": "stentirovanie",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 499,
                                    "target": "organization",
                                    "name": "Кардиохирургия",
                                    "slug": "kardiohirurgiya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 500,
                                    "target": "organization",
                                    "name": "Гинекологические операции",
                                    "slug": "ginekologicheskie-operatsii",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 501,
                                    "target": "organization",
                                    "name": "Урологические операции",
                                    "slug": "urologicheskie-operatsii",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 502,
                                    "target": "organization",
                                    "name": "Проктологические операции",
                                    "slug": "proktologicheskie-operatsii",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 503,
                                    "target": "organization",
                                    "name": "Лор-операции",
                                    "slug": "lor-operatsii",
                                    "icon": "lor.svg",
                                    "children": []
                                },
                                {
                                    "id": 504,
                                    "target": "organization",
                                    "name": "Лапароскопия",
                                    "slug": "laparoskopiya",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 505,
                    "target": "organization",
                    "name": "Аппаратные процедуры?",
                    "slug": "apparatnie-protseduri",
                    "icon": "p_1.svg",
                    "children": [
                        {
                            "id": 506,
                            "target": "organization",
                            "name": "Транскраниальная магнитная стимуляция",
                            "slug": "transkranialynaya-magnitnaya-stimulyatsiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 507,
                            "target": "organization",
                            "name": "БОС - терапия",
                            "slug": "bos-terapiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 508,
                            "target": "organization",
                            "name": "Внутривенное лазерное облучение крови",
                            "slug": "vnutrivennoe-lazernoe-obluchenie-krovi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 509,
                            "target": "organization",
                            "name": "Фиброскан",
                            "slug": "fibroskan",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 510,
                    "target": "organization",
                    "name": "Дети????",
                    "slug": "deti",
                    "icon": "p_5.svg",
                    "children": [
                        {
                            "id": 511,
                            "target": "organization",
                            "name": "УЗИ головного мозга",
                            "slug": "uzi-golovnogo-mozga",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 512,
                            "target": "organization",
                            "name": "Детский массаж",
                            "slug": "detskiy-massazh",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 513,
                            "target": "organization",
                            "name": "Стоматология дети",
                            "slug": "stomatologiya-deti",
                            "icon": null,
                            "children": [
                                {
                                    "id": 514,
                                    "target": "organization",
                                    "name": "Удаление зуба(дети)",
                                    "slug": "udalenie-zuba(deti)",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 515,
                                    "target": "organization",
                                    "name": "Лечение кариеса(дети)",
                                    "slug": "lechenie-kariesa(deti)",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 517,
                                    "target": "organization",
                                    "name": "Чистка зубов(дети)",
                                    "slug": "chistka-zubov(deti)",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 516,
                                    "target": "organization",
                                    "name": "Установка пломбы(дети)",
                                    "slug": "ustanovka-plombi(deti)",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 518,
                            "target": "organization",
                            "name": "Детский дневной стационар",
                            "slug": "detskiy-dnevnoy-statsionar",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 519,
                    "target": "organization",
                    "name": "Эстетическая медицина?",
                    "slug": "esteticheskaya-meditsina",
                    "icon": "12.svg",
                    "children": [
                        {
                            "id": 520,
                            "target": "organization",
                            "name": "Кожа??",
                            "slug": "kozha",
                            "icon": "p_10.svg",
                            "children": [
                                {
                                    "id": 521,
                                    "target": "organization",
                                    "name": "Удаление бородавок",
                                    "slug": "udalenie-borodavok",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 522,
                                    "target": "organization",
                                    "name": "Удаление папиллом",
                                    "slug": "udalenie-papillom",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 523,
                                    "target": "organization",
                                    "name": "Лазерное удаление новообразований",
                                    "slug": "lazernoe-udalenie-novoobrazovaniy",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 524,
                                    "target": "organization",
                                    "name": "Лечение пигментаций",
                                    "slug": "lechenie-pigmentatsiy",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 525,
                                    "target": "organization",
                                    "name": "Термолифтинг",
                                    "slug": "termolifting",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 526,
                                    "target": "organization",
                                    "name": "Удаление татуировки",
                                    "slug": "udalenie-tatuirovki",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 527,
                                    "target": "organization",
                                    "name": "Лифтинг лица",
                                    "slug": "lifting-litsa",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 528,
                                    "target": "organization",
                                    "name": "Фототерапия",
                                    "slug": "fototerapiya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 529,
                                    "target": "organization",
                                    "name": "Чистка лица",
                                    "slug": "chistka-litsa",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 531,
                                    "target": "organization",
                                    "name": "Криолиполиз",
                                    "slug": "kriolipoliz",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 532,
                                    "target": "organization",
                                    "name": "PRP терапия",
                                    "slug": "prp-terapiya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 534,
                                    "target": "organization",
                                    "name": "SMAS лифтинг",
                                    "slug": "smas-lifting",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 533,
                                    "target": "organization",
                                    "name": "Микроигольчатый лифтинг",
                                    "slug": "mikroigolychatiy-lifting",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 537,
                                    "target": "organization",
                                    "name": "Дерматоскопия",
                                    "slug": "dermatoskopiya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 538,
                                    "target": "organization",
                                    "name": "Озонотерапия",
                                    "slug": "ozonoterapiya",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 539,
                            "target": "organization",
                            "name": "Интимная косметология?",
                            "slug": "intimnaya-kosmetologiya",
                            "icon": "p_8.svg",
                            "children": [
                                {
                                    "id": 540,
                                    "target": "organization",
                                    "name": "Лазерное интимное омоложение",
                                    "slug": "lazernoe-intimnoe-omolozhenie",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 541,
                            "target": "organization",
                            "name": "Лазерная эпиляция",
                            "slug": "lazernaya-epilyatsiya",
                            "icon": "lips.svg",
                            "children": []
                        }
                    ]
                },
                {
                    "id": 328,
                    "target": "organization",
                    "name": "ЛОР-процедуры??",
                    "slug": "lor-protseduri",
                    "icon": "p_11.svg",
                    "children": [
                        {
                            "id": 329,
                            "target": "organization",
                            "name": "Промывание носа",
                            "slug": "promivanie-nosa",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 330,
                            "target": "organization",
                            "name": "Промывание горла",
                            "slug": "promivanie-gorla",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 331,
                            "target": "organization",
                            "name": "Промывание уха",
                            "slug": "promivanie-uha",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 332,
                            "target": "organization",
                            "name": "Ингаляция",
                            "slug": "ingalyatsiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 333,
                            "target": "organization",
                            "name": "Рентген пазух носа",
                            "slug": "rentgen-pazuh-nosa",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 334,
                            "target": "organization",
                            "name": "Тимпанометрия",
                            "slug": "timpanometriya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 335,
                            "target": "organization",
                            "name": "Аудиометрия",
                            "slug": "audiometriya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 336,
                    "target": "organization",
                    "name": "Инъекции?",
                    "slug": "inaektsii",
                    "icon": "p_9.svg",
                    "children": [
                        {
                            "id": 337,
                            "target": "organization",
                            "name": "Внутримышечные инъекции",
                            "slug": "vnutrimishechnie-inaektsii",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 338,
                            "target": "organization",
                            "name": "Внутривенные инъекции",
                            "slug": "vnutrivennie-inaektsii",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 339,
                            "target": "organization",
                            "name": "Капельница",
                            "slug": "kapelynitsa",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 340,
                    "target": "organization",
                    "name": "ЭКО??",
                    "slug": "eko",
                    "icon": "eco.svg",
                    "children": [
                        {
                            "id": 341,
                            "target": "organization",
                            "name": "Экстракорпоральное оплодотворение",
                            "slug": "ekstrakorporalynoe-oplodotvorenie",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 342,
                            "target": "organization",
                            "name": "Инсеминация",
                            "slug": "inseminatsiya",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 344,
                    "target": "organization",
                    "name": "Физиотерапия??‍♂️",
                    "slug": "fizioterapiya‍️",
                    "icon": "p_19.svg",
                    "children": [
                        {
                            "id": 353,
                            "target": "organization",
                            "name": "Гирудотерапия (пиявки)",
                            "slug": "girudoterapiya-(piyavki)",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 355,
                            "target": "organization",
                            "name": "Мануальная терапия",
                            "slug": "manualynaya-terapiya",
                            "icon": null,
                            "children": [
                                {
                                    "id": 356,
                                    "target": "organization",
                                    "name": "Мануальная терапия позвоночника",
                                    "slug": "manualynaya-terapiya-pozvonochnika",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 357,
                                    "target": "organization",
                                    "name": "Мануальная терапия живота",
                                    "slug": "manualynaya-terapiya-zhivota",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 358,
                                    "target": "organization",
                                    "name": "Общая мануальная терапия",
                                    "slug": "obshtaya-manualynaya-terapiya",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 359,
                                    "target": "organization",
                                    "name": "Мануальная терапия головы",
                                    "slug": "manualynaya-terapiya-golovi",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 360,
                            "target": "organization",
                            "name": "Криосауна",
                            "slug": "kriosauna",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 361,
                            "target": "organization",
                            "name": "Гальванотерапия (электрический ток)",
                            "slug": "galyvanoterapiya-(elektricheskiy-tok)",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 346,
                            "target": "organization",
                            "name": "Ультразвуковая терапия",
                            "slug": "ulytrazvukovaya-terapiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 347,
                            "target": "organization",
                            "name": "Иглотерапия",
                            "slug": "igloterapiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 348,
                            "target": "organization",
                            "name": "Дарсонваль",
                            "slug": "darsenval",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 349,
                            "target": "organization",
                            "name": "Массаж",
                            "slug": "massazh",
                            "icon": null,
                            "children": [
                                {
                                    "id": 350,
                                    "target": "organization",
                                    "name": "Общий массаж (взрослые)",
                                    "slug": "obshtiy-massazh-(vzroslie)",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 351,
                            "target": "organization",
                            "name": "Лазерная терапия",
                            "slug": "lazernaya-terapiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 352,
                            "target": "organization",
                            "name": "Магнитотерапия",
                            "slug": "magnitoterapiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 354,
                            "target": "organization",
                            "name": "Хиджама",
                            "slug": "hizhama",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 345,
                            "target": "organization",
                            "name": "Электрофорез",
                            "slug": "elektroforez",
                            "icon": null,
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "target": "organization",
            "name": "Анализы",
            "slug": "tests",
            "icon": null,
            "children": [
                {
                    "id": 299,
                    "target": "organization",
                    "name": "Сперма",
                    "slug": "sperma",
                    "icon": "a_8.svg",
                    "children": [
                        {
                            "id": 300,
                            "target": "organization",
                            "name": "Спермограмма",
                            "slug": "spermogramma",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 238,
                    "target": "organization",
                    "name": "Тесты на вирусы",
                    "slug": "testi-na-virusi",
                    "icon": "a_10.svg",
                    "children": [
                        {
                            "id": 248,
                            "target": "organization",
                            "name": "Гепатит В",
                            "slug": "gepatit-v",
                            "icon": null,
                            "children": [
                                {
                                    "id": 250,
                                    "target": "organization",
                                    "name": "Гепатит В ПЦР тест",
                                    "slug": "gepatit-v-ptsr-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 249,
                                    "target": "organization",
                                    "name": "Гепатит В ИФА тест",
                                    "slug": "gepatit-v-ifa-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 254,
                            "target": "organization",
                            "name": "Гепатит D",
                            "slug": "gepatit-d",
                            "icon": null,
                            "children": [
                                {
                                    "id": 255,
                                    "target": "organization",
                                    "name": "Гепатит D ИФА тест",
                                    "slug": "gepatit-d-ifa-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 256,
                                    "target": "organization",
                                    "name": "Гепатит D ПЦР тест",
                                    "slug": "gepatit-d-ptsr-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 257,
                            "target": "organization",
                            "name": "ВПЧ (вирус папиломы человека)",
                            "slug": "vpch-(virus-papilomi-cheloveka)",
                            "icon": null,
                            "children": [
                                {
                                    "id": 259,
                                    "target": "organization",
                                    "name": "ВПЧ ИФА тест",
                                    "slug": "vpch-ifa-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 258,
                                    "target": "organization",
                                    "name": "ВПЧ ПЦР тест",
                                    "slug": "vpch-ptsr-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 239,
                            "target": "organization",
                            "name": "Вирус Герпеса",
                            "slug": "virus-gerpesa",
                            "icon": null,
                            "children": [
                                {
                                    "id": 241,
                                    "target": "organization",
                                    "name": "Вирус Герпеса ИФА тест",
                                    "slug": "virus-gerpesa-ifa-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 240,
                                    "target": "organization",
                                    "name": "Вирус Герпеса ПЦР тест",
                                    "slug": "virus-gerpesa-ptsr-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 263,
                            "target": "organization",
                            "name": "Краснуха",
                            "slug": "krasnuha",
                            "icon": null,
                            "children": [
                                {
                                    "id": 264,
                                    "target": "organization",
                                    "name": "Краснуха ИФА тест",
                                    "slug": "krasnuha-ifa-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 260,
                            "target": "organization",
                            "name": "Вирус Эпштейна-Барра",
                            "slug": "virus-epshteyna-barra",
                            "icon": null,
                            "children": [
                                {
                                    "id": 262,
                                    "target": "organization",
                                    "name": "Вирус Эпштейна-Барра ИФА тест",
                                    "slug": "virus-epshteyna-barra-ifa-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 261,
                                    "target": "organization",
                                    "name": "Вирус Эпштейна-Барра ПЦР тест",
                                    "slug": "virus-epshteyna-barra-ptsr-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 265,
                            "target": "organization",
                            "name": "ВИЧ-СПИД",
                            "slug": "vich-spid",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 251,
                            "target": "organization",
                            "name": "Гепатит С",
                            "slug": "gepatit-s",
                            "icon": null,
                            "children": [
                                {
                                    "id": 252,
                                    "target": "organization",
                                    "name": "Гепатит С ИФА тест",
                                    "slug": "gepatit-s-ifa-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 253,
                                    "target": "organization",
                                    "name": "Гепатит С ПЦР тест",
                                    "slug": "gepatit-s-ptsr-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 245,
                            "target": "organization",
                            "name": "Гепатит А",
                            "slug": "gepatit-a",
                            "icon": null,
                            "children": [
                                {
                                    "id": 247,
                                    "target": "organization",
                                    "name": "Гепатит А ПЦР тест",
                                    "slug": "gepatit-a-ptsr-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 246,
                                    "target": "organization",
                                    "name": "Гепатит А ИФА тест",
                                    "slug": "gepatit-a-ifa-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 242,
                            "target": "organization",
                            "name": "Цитомегаловирус",
                            "slug": "tsitomegalovirus",
                            "icon": null,
                            "children": [
                                {
                                    "id": 244,
                                    "target": "organization",
                                    "name": "Цитомегаловирус ПЦР тест",
                                    "slug": "tsitomegalovirus-ptsr-test",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 243,
                                    "target": "organization",
                                    "name": "Цитомегаловирус ИФА тест",
                                    "slug": "tsitomegalovirus-ifa-test",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 266,
                    "target": "organization",
                    "name": "Генетические тесты",
                    "slug": "geneticheskie-testi",
                    "icon": "a_4.svg",
                    "children": [
                        {
                            "id": 274,
                            "target": "organization",
                            "name": "Онкогенетика",
                            "slug": "onkogenetika",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 268,
                            "target": "organization",
                            "name": "Тесты на кариотипирование",
                            "slug": "testi-na-kariotipirovanie",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 267,
                            "target": "organization",
                            "name": "Тесты на генотипирование",
                            "slug": "testi-na-genotipirovanie",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 269,
                            "target": "organization",
                            "name": "ДНК тест",
                            "slug": "dnk-test",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 270,
                            "target": "organization",
                            "name": "Генетическое исследование мужчин",
                            "slug": "geneticheskoe-issledovanie-muzhchin",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 271,
                            "target": "organization",
                            "name": "Генетическое исследование женщин",
                            "slug": "geneticheskoe-issledovanie-zhenshtin",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 272,
                            "target": "organization",
                            "name": "Генетические исследования сердца и сосудов",
                            "slug": "geneticheskie-issledovaniya-serdtsa-i-sosudov",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 273,
                            "target": "organization",
                            "name": "Генетическое исследование коррекции веса",
                            "slug": "geneticheskoe-issledovanie-korrektsii-vesa",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 275,
                            "target": "organization",
                            "name": "Генетическое исследование сахарного диабета",
                            "slug": "geneticheskoe-issledovanie-saharnogo-diabeta",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 276,
                            "target": "organization",
                            "name": "Генетическое исследование непереносимости лактозы",
                            "slug": "geneticheskoe-issledovanie-neperenosimosti-laktozi",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 222,
                    "target": "organization",
                    "name": "Кал",
                    "slug": "kal",
                    "icon": "a_5.svg",
                    "children": [
                        {
                            "id": 223,
                            "target": "organization",
                            "name": "Общий анализ кала",
                            "slug": "obshtiy-analiz-kala",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 224,
                            "target": "organization",
                            "name": "Анализ кала на глисты",
                            "slug": "analiz-kala-na-glisti",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 126,
                    "target": "organization",
                    "name": "Кровь",
                    "slug": "krovy",
                    "icon": "a_3.svg",
                    "children": [
                        {
                            "id": 163,
                            "target": "organization",
                            "name": "Анемия",
                            "slug": "anemiya",
                            "icon": null,
                            "children": [
                                {
                                    "id": 166,
                                    "target": "organization",
                                    "name": "Общая железосвязывающая способность ",
                                    "slug": "obshtaya-zhelezosvyazivayushtaya-sposobnosty",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 167,
                                    "target": "organization",
                                    "name": "Ферритин",
                                    "slug": "ferritin",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 165,
                                    "target": "organization",
                                    "name": "Трансферрин",
                                    "slug": "transferrin",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 164,
                                    "target": "organization",
                                    "name": "Железо",
                                    "slug": "zhelezo-1",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 168,
                            "target": "organization",
                            "name": "Тест на группу крови",
                            "slug": "test-na-gruppu-krovi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 158,
                            "target": "organization",
                            "name": "Общий анализ крови",
                            "slug": "obshtiy-analiz-krovi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 128,
                            "target": "organization",
                            "name": "Гормоны",
                            "slug": "gormoni",
                            "icon": null,
                            "children": [
                                {
                                    "id": 129,
                                    "target": "organization",
                                    "name": "Гормоны щитовидной железы",
                                    "slug": "gormoni-shtitovidnoy-zhelezi",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 130,
                                            "target": "organization",
                                            "name": "ТТГ",
                                            "slug": "ttg",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 138,
                                            "target": "organization",
                                            "name": "АнтиТГ",
                                            "slug": "antitg",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 134,
                                            "target": "organization",
                                            "name": "Т4 Тироксин",
                                            "slug": "t4-tiroksin",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 136,
                                            "target": "organization",
                                            "name": "Т4 свободный",
                                            "slug": "t4-svobodniy",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 132,
                                            "target": "organization",
                                            "name": "Т3 общий",
                                            "slug": "t3-obshtiy",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 135,
                                            "target": "organization",
                                            "name": "Т4 общий",
                                            "slug": "t4-obshtiy",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 137,
                                            "target": "organization",
                                            "name": "АнтиТПО",
                                            "slug": "antitpo",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 131,
                                            "target": "organization",
                                            "name": "T3 Трийодтиронин",
                                            "slug": "t3-triyodtironin",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 133,
                                            "target": "organization",
                                            "name": "Т3 свободный",
                                            "slug": "t3-svobodniy",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 139,
                                            "target": "organization",
                                            "name": "Тиреоглобулин",
                                            "slug": "tireoglobulin",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": 140,
                                    "target": "organization",
                                    "name": "Общие гормоны",
                                    "slug": "obshtie-gormoni",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 153,
                                            "target": "organization",
                                            "name": "ДГЕА-сульфат",
                                            "slug": "dgea-sulyfat",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 145,
                                            "target": "organization",
                                            "name": "Эстрадиол",
                                            "slug": "estradiol",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 147,
                                            "target": "organization",
                                            "name": "Свободный тестостерон",
                                            "slug": "svobodniy-testosteron",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 142,
                                            "target": "organization",
                                            "name": "ЛГ",
                                            "slug": "lg",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 154,
                                            "target": "organization",
                                            "name": "Антимюллеровский гормон",
                                            "slug": "antimyullerovskiy-gormon",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 146,
                                            "target": "organization",
                                            "name": "Тестостерон",
                                            "slug": "testosteron",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 157,
                                            "target": "organization",
                                            "name": "Дофамин",
                                            "slug": "dofamin",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 148,
                                            "target": "organization",
                                            "name": "Пролактин",
                                            "slug": "prolaktin",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 144,
                                            "target": "organization",
                                            "name": "Прогестерон",
                                            "slug": "progesteron",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 149,
                                            "target": "organization",
                                            "name": "Кортизол",
                                            "slug": "kortizol",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 152,
                                            "target": "organization",
                                            "name": "ГСПГ",
                                            "slug": "gspg",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 155,
                                            "target": "organization",
                                            "name": "Мелатонин",
                                            "slug": "melatonin",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 150,
                                            "target": "organization",
                                            "name": "17-OH прогестерон",
                                            "slug": "17-oh-progesteron",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 156,
                                            "target": "organization",
                                            "name": "Адреналин",
                                            "slug": "adrenalin",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 143,
                                            "target": "organization",
                                            "name": "ХГЧ",
                                            "slug": "hgch",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 151,
                                            "target": "organization",
                                            "name": "Гормон роста",
                                            "slug": "gormon-rosta",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 141,
                                            "target": "organization",
                                            "name": "ФСГ",
                                            "slug": "fsg",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 127,
                            "target": "organization",
                            "name": "Коагулограмма",
                            "slug": "koagulogramma",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 159,
                            "target": "organization",
                            "name": "Ревмопробы",
                            "slug": "revmoprobi",
                            "icon": null,
                            "children": [
                                {
                                    "id": 161,
                                    "target": "organization",
                                    "name": "С-реактивный белок",
                                    "slug": "s-reaktivniy-belok",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 160,
                                    "target": "organization",
                                    "name": "Антистрептолизин О (ASLO)",
                                    "slug": "antistreptolizin-o-(aslo)",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 162,
                                    "target": "organization",
                                    "name": "Ревматоидный фактор",
                                    "slug": "revmatoidniy-faktor",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 169,
                            "target": "organization",
                            "name": "Печеночные пробы",
                            "slug": "pechenochnie-probi",
                            "icon": null,
                            "children": [
                                {
                                    "id": 173,
                                    "target": "organization",
                                    "name": "Щелочная фосфатаза",
                                    "slug": "shtelochnaya-fosfataza",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 174,
                                    "target": "organization",
                                    "name": "Альбумин",
                                    "slug": "alybumin",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 172,
                                    "target": "organization",
                                    "name": "Билирубин",
                                    "slug": "bilirubin",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 171,
                                    "target": "organization",
                                    "name": "АСТ",
                                    "slug": "ast",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 170,
                                    "target": "organization",
                                    "name": "АЛТ",
                                    "slug": "alt",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 175,
                            "target": "organization",
                            "name": "Микроэлементы",
                            "slug": "mikroelementi",
                            "icon": null,
                            "children": [
                                {
                                    "id": 177,
                                    "target": "organization",
                                    "name": "Магний",
                                    "slug": "magniy",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 178,
                                    "target": "organization",
                                    "name": "Фтор",
                                    "slug": "ftor",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 184,
                                    "target": "organization",
                                    "name": "Бикарбонат",
                                    "slug": "bikarbonat",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 179,
                                    "target": "organization",
                                    "name": "Железо",
                                    "slug": "zhelezo",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 186,
                                    "target": "organization",
                                    "name": "Цинк",
                                    "slug": "tsink",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 180,
                                    "target": "organization",
                                    "name": "Натрий",
                                    "slug": "natriy",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 185,
                                    "target": "organization",
                                    "name": "Хлор",
                                    "slug": "hlor",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 182,
                                    "target": "organization",
                                    "name": "Фосфор",
                                    "slug": "fosfor",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 176,
                                    "target": "organization",
                                    "name": "Калий",
                                    "slug": "kaliy",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 183,
                                    "target": "organization",
                                    "name": "Литий",
                                    "slug": "litiy",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 181,
                                    "target": "organization",
                                    "name": "Кальций",
                                    "slug": "kalytsiy",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 187,
                            "target": "organization",
                            "name": "Витамины",
                            "slug": "vitamini",
                            "icon": null,
                            "children": [
                                {
                                    "id": 191,
                                    "target": "organization",
                                    "name": "Витамин А",
                                    "slug": "vitamin-a",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 188,
                                    "target": "organization",
                                    "name": "Витамин D",
                                    "slug": "vitamin-d",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 192,
                                    "target": "organization",
                                    "name": "Витамин В6",
                                    "slug": "vitamin-v6",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 190,
                                    "target": "organization",
                                    "name": "Фолиевая кислота",
                                    "slug": "folievaya-kislota",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 189,
                                    "target": "organization",
                                    "name": "Витамин В-12",
                                    "slug": "vitamin-v-12",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 193,
                            "target": "organization",
                            "name": "Онкомаркеры",
                            "slug": "onkomarkeri",
                            "icon": null,
                            "children": [
                                {
                                    "id": 196,
                                    "target": "organization",
                                    "name": "CA 15-3",
                                    "slug": "ca-15-3",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 206,
                                    "target": "organization",
                                    "name": "Индекс ROMA",
                                    "slug": "indeks-roma",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 205,
                                    "target": "organization",
                                    "name": "SCCA",
                                    "slug": "scca",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 203,
                                    "target": "organization",
                                    "name": "HER-2",
                                    "slug": "her-2",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 199,
                                    "target": "organization",
                                    "name": "CEA",
                                    "slug": "cea",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 200,
                                    "target": "organization",
                                    "name": "PSA",
                                    "slug": "psa",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 197,
                                    "target": "organization",
                                    "name": "CA 19-9",
                                    "slug": "ca-19-9",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 204,
                                    "target": "organization",
                                    "name": "CYFRA 21-1",
                                    "slug": "cyfra-21-1",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 201,
                                    "target": "organization",
                                    "name": "HE4",
                                    "slug": "he4",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 198,
                                    "target": "organization",
                                    "name": "CA 27-29",
                                    "slug": "ca-27-29",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 202,
                                    "target": "organization",
                                    "name": "CA 72-4",
                                    "slug": "ca-72-4",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 195,
                                    "target": "organization",
                                    "name": "CA 125",
                                    "slug": "ca-125",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 194,
                                    "target": "organization",
                                    "name": "AFP",
                                    "slug": "afp",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 207,
                            "target": "organization",
                            "name": "Диабет",
                            "slug": "diabet",
                            "icon": null,
                            "children": [
                                {
                                    "id": 210,
                                    "target": "organization",
                                    "name": "Инсулин",
                                    "slug": "insulin",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 208,
                                    "target": "organization",
                                    "name": "Глюкоза",
                                    "slug": "glyukoza",
                                    "icon": null,
                                    "children": []
                                },
                                {
                                    "id": 209,
                                    "target": "organization",
                                    "name": "Гликозилированный гемоглобин",
                                    "slug": "glikozilirovanniy-gemoglobin",
                                    "icon": null,
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 326,
                    "target": "organization",
                    "name": "Биопсия",
                    "slug": "biopsiya",
                    "icon": "a_2.svg",
                    "children": []
                },
                {
                    "id": 225,
                    "target": "organization",
                    "name": "Бактериальный посев",
                    "slug": "bakterialyniy-posev",
                    "icon": "a_1.svg",
                    "children": [
                        {
                            "id": 236,
                            "target": "organization",
                            "name": "Бактериальный посев из глаза",
                            "slug": "bakterialyniy-posev-iz-glaza",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 232,
                            "target": "organization",
                            "name": "Бактериальный посев мокроты",
                            "slug": "bakterialyniy-posev-mokroti",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 233,
                            "target": "organization",
                            "name": "Бактериальный посев(гинекология)",
                            "slug": "bakterialyniy-posev(ginekologiya)",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 226,
                            "target": "organization",
                            "name": "Бактериальный посев мочи",
                            "slug": "bakterialyniy-posev-mochi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 227,
                            "target": "organization",
                            "name": "Бактериальный посев кала",
                            "slug": "bakterialyniy-posev-kala",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 228,
                            "target": "organization",
                            "name": "Бактериальный посев спермы",
                            "slug": "bakterialyniy-posev-spermi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 229,
                            "target": "organization",
                            "name": "Бактериальный посев из зева",
                            "slug": "bakterialyniy-posev-iz-zeva",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 230,
                            "target": "organization",
                            "name": "Бактериальный посев из носа",
                            "slug": "bakterialyniy-posev-iz-nosa",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 231,
                            "target": "organization",
                            "name": "Бактериальный посев из уха",
                            "slug": "bakterialyniy-posev-iz-uha",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 234,
                            "target": "organization",
                            "name": "Бактериальный посев из уретры",
                            "slug": "bakterialyniy-posev-iz-uretri",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 235,
                            "target": "organization",
                            "name": "Бактериальный посев грудного молока",
                            "slug": "bakterialyniy-posev-grudnogo-moloka",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 237,
                            "target": "organization",
                            "name": "Бактериальный посев на дисбактериоз",
                            "slug": "bakterialyniy-posev-na-disbakterioz",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 277,
                    "target": "organization",
                    "name": "Тесты на инфекции",
                    "slug": "testi-na-infektsii",
                    "icon": "a_12.svg",
                    "children": [
                        {
                            "id": 291,
                            "target": "organization",
                            "name": "Тест на хеликобактер",
                            "slug": "test-na-helikobakter",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 292,
                            "target": "organization",
                            "name": "Тест на стрептококк",
                            "slug": "test-na-streptokokk",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 278,
                            "target": "organization",
                            "name": "Тесты на TORCH инфекции",
                            "slug": "testi-na-torch-infektsii",
                            "icon": null,
                            "children": [
                                {
                                    "id": 285,
                                    "target": "organization",
                                    "name": "Микоплазма",
                                    "slug": "mikoplazma",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 286,
                                            "target": "organization",
                                            "name": "Микоплазма ИФА тест",
                                            "slug": "mikoplazma-ifa-test",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 287,
                                            "target": "organization",
                                            "name": "Микоплазма ПЦР тест",
                                            "slug": "mikoplazma-ptsr-test",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": 288,
                                    "target": "organization",
                                    "name": "Токсоплазма",
                                    "slug": "toksoplazma",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 290,
                                            "target": "organization",
                                            "name": "Токсоплазма ПЦР тест",
                                            "slug": "toksoplazma-ptsr-test",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 289,
                                            "target": "organization",
                                            "name": "Токсоплазма ИФА тест",
                                            "slug": "toksoplazma-ifa-test",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": 279,
                                    "target": "organization",
                                    "name": "Хламидии",
                                    "slug": "hlamidii",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 281,
                                            "target": "organization",
                                            "name": "Хламидии ПЦР тест",
                                            "slug": "hlamidii-ptsr-test",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 280,
                                            "target": "organization",
                                            "name": "Хламидии ИФА тест",
                                            "slug": "hlamidii-ifa-test",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": 282,
                                    "target": "organization",
                                    "name": "Уреаплазма",
                                    "slug": "ureaplazma",
                                    "icon": null,
                                    "children": [
                                        {
                                            "id": 284,
                                            "target": "organization",
                                            "name": "Уреаплазма ПЦР тест",
                                            "slug": "ureaplazma-ptsr-test",
                                            "icon": null,
                                            "children": []
                                        },
                                        {
                                            "id": 283,
                                            "target": "organization",
                                            "name": "Уреаплазма ИФА тест",
                                            "slug": "ureaplazma-ifa-test",
                                            "icon": null,
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 215,
                    "target": "organization",
                    "name": "Экспресс тесты",
                    "slug": "ekspress-testi",
                    "icon": "a_13.svg",
                    "children": [
                        {
                            "id": 218,
                            "target": "organization",
                            "name": "Экспресс тест на сифилис",
                            "slug": "ekspress-test-na-sifilis",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 216,
                            "target": "organization",
                            "name": "Экспресс тест на гепатит В",
                            "slug": "ekspress-test-na-gepatit-v",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 217,
                            "target": "organization",
                            "name": "Экспресс тест на гепатит С",
                            "slug": "ekspress-test-na-gepatit-s",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 219,
                            "target": "organization",
                            "name": "Экспресс тест на ВИЧ-СПИД",
                            "slug": "ekspress-test-na-vich-spid",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 220,
                            "target": "organization",
                            "name": "Экспресс тест на бруцеллез",
                            "slug": "ekspress-test-na-brutsellez",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 221,
                            "target": "organization",
                            "name": "Экспресс тест на сахар",
                            "slug": "ekspress-test-na-sahar",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 211,
                    "target": "organization",
                    "name": "Моча",
                    "slug": "mocha",
                    "icon": "a_7.svg",
                    "children": [
                        {
                            "id": 212,
                            "target": "organization",
                            "name": "Общий анализ мочи",
                            "slug": "obshtiy-analiz-mochi",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 213,
                            "target": "organization",
                            "name": "Анализ мочи по Нечипоренко",
                            "slug": "analiz-mochi-po-nechiporenko",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 214,
                            "target": "organization",
                            "name": "Исследование мочи по Зимницкому",
                            "slug": "issledovanie-mochi-po-zimnitskomu",
                            "icon": null,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 293,
                    "target": "organization",
                    "name": "Тесты на аллергию",
                    "slug": "testi-na-allergiyu",
                    "icon": "a_9.svg",
                    "children": [
                        {
                            "id": 298,
                            "target": "organization",
                            "name": "Аллергия на плесень",
                            "slug": "allergiya-na-pleseny",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 294,
                            "target": "organization",
                            "name": "Пищевая аллергия",
                            "slug": "pishtevaya-allergiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 296,
                            "target": "organization",
                            "name": "Аллергия на животных",
                            "slug": "allergiya-na-zhivotnih",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 297,
                            "target": "organization",
                            "name": "Бытовая аллергия",
                            "slug": "bitovaya-allergiya",
                            "icon": null,
                            "children": []
                        },
                        {
                            "id": 295,
                            "target": "organization",
                            "name": "Аллергия на растения",
                            "slug": "allergiya-na-rasteniya",
                            "icon": null,
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 4,
            "target": "organization",
            "name": "Covid 19",
            "slug": "covid",
            "icon": null,
            "children": []
        },
        {
            "id": 5,
            "target": "organization",
            "name": "Вакцинация",
            "slug": "vaccination",
            "icon": null,
            "children": []
        },
        {
            "id": 6,
            "target": "organization",
            "name": "Круглосуточная помощ",
            "slug": "full-day-assistance",
            "icon": null,
            "children": []
        },
        {
            "id": 7,
            "target": "organization",
            "name": "Эстетическая медицина",
            "slug": "aesthetic",
            "icon": null,
            "children": []
        },
        {
            "id": 8,
            "target": "organization",
            "name": "Лаборатория на выезд",
            "slug": "on-site-laboratory",
            "icon": null,
            "children": []
        },
        {
            "id": 9,
            "target": "organization",
            "name": "Скорая помощ",
            "slug": "ambulance",
            "icon": null,
            "children": []
        },
        {
            "id": 10,
            "target": "organization",
            "name": "Стационар",
            "slug": "hospital",
            "icon": null,
            "children": []
        },
        {
            "id": 11,
            "target": "organization",
            "name": "Акции",
            "slug": "promotions",
            "icon": null,
            "children": []
        }
    ],
  doctors: [
    {
        "id": 12,
        "target": "doctor",
        "name": "Эндокринолог",
        "slug": "endokrinolog",
        "icon": null,
        "children": []
    },
    {
        "id": 13,
        "target": "doctor",
        "name": "Лор",
        "slug": "lor",
        "icon": null,
        "children": []
    },
    {
        "id": 14,
        "target": "doctor",
        "name": "Терапевт",
        "slug": "terapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 15,
        "target": "doctor",
        "name": "Гинеколог",
        "slug": "ginekolog",
        "icon": null,
        "children": []
    },
    {
        "id": 16,
        "target": "doctor",
        "name": "Маммолог",
        "slug": "mammolog",
        "icon": null,
        "children": []
    },
    {
        "id": 22,
        "target": "doctor",
        "name": "Глазной врач",
        "slug": "glaznoy-vrach",
        "icon": null,
        "children": []
    },
    {
        "id": 17,
        "target": "doctor",
        "name": "Детский невропатолог",
        "slug": "detskiy-nevropatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 18,
        "target": "doctor",
        "name": "Невролог",
        "slug": "nevrolog",
        "icon": null,
        "children": []
    },
    {
        "id": 19,
        "target": "doctor",
        "name": "Уролог",
        "slug": "urolog",
        "icon": null,
        "children": []
    },
    {
        "id": 20,
        "target": "doctor",
        "name": "Узист",
        "slug": "uzist",
        "icon": null,
        "children": []
    },
    {
        "id": 21,
        "target": "doctor",
        "name": "Психоневролог",
        "slug": "psihonevrolog",
        "icon": null,
        "children": []
    },
    {
        "id": 23,
        "target": "doctor",
        "name": "Травматолог",
        "slug": "travmatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 24,
        "target": "doctor",
        "name": "Вертебролог",
        "slug": "vertebrolog",
        "icon": null,
        "children": []
    },
    {
        "id": 25,
        "target": "doctor",
        "name": "Ортопед",
        "slug": "ortoped",
        "icon": null,
        "children": []
    },
    {
        "id": 26,
        "target": "doctor",
        "name": "Инфекционист",
        "slug": "infektsionist",
        "icon": null,
        "children": []
    },
    {
        "id": 27,
        "target": "doctor",
        "name": "Кардиолог",
        "slug": "kardiolog",
        "icon": null,
        "children": []
    },
    {
        "id": 28,
        "target": "doctor",
        "name": "Аллерголог",
        "slug": "allergolog",
        "icon": null,
        "children": []
    },
    {
        "id": 29,
        "target": "doctor",
        "name": "Стоматолог",
        "slug": "stomatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 30,
        "target": "doctor",
        "name": "Дерматолог",
        "slug": "dermatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 31,
        "target": "doctor",
        "name": "Логопед",
        "slug": "logoped",
        "icon": null,
        "children": []
    },
    {
        "id": 32,
        "target": "doctor",
        "name": "Гастроэнтеролог",
        "slug": "gastroenterolog",
        "icon": null,
        "children": []
    },
    {
        "id": 33,
        "target": "doctor",
        "name": "Кожвенеролог",
        "slug": "kozhvenerolog",
        "icon": null,
        "children": []
    },
    {
        "id": 34,
        "target": "doctor",
        "name": "Дефектолог",
        "slug": "defektolog",
        "icon": null,
        "children": []
    },
    {
        "id": 63,
        "target": "doctor",
        "name": "Дерматоонколог",
        "slug": "dermatoonkolog",
        "icon": null,
        "children": []
    },
    {
        "id": 35,
        "target": "doctor",
        "name": "Ортодонт",
        "slug": "ortodont",
        "icon": null,
        "children": []
    },
    {
        "id": 36,
        "target": "doctor",
        "name": "Детский стоматолог",
        "slug": "detskiy-stomatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 37,
        "target": "doctor",
        "name": "Рентгенолог",
        "slug": "rentgenolog",
        "icon": null,
        "children": []
    },
    {
        "id": 38,
        "target": "doctor",
        "name": "Фиброскан-специалист",
        "slug": "fibroskan-spetsialist",
        "icon": null,
        "children": []
    },
    {
        "id": 39,
        "target": "doctor",
        "name": "Кардиоревматолог",
        "slug": "kardiorevmatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 40,
        "target": "doctor",
        "name": "Детский гинеколог",
        "slug": "detskiy-ginekolog",
        "icon": null,
        "children": []
    },
    {
        "id": 41,
        "target": "doctor",
        "name": "Репродуктолог",
        "slug": "reproduktolog",
        "icon": null,
        "children": []
    },
    {
        "id": 42,
        "target": "doctor",
        "name": "Эмбриолог",
        "slug": "embriolog",
        "icon": null,
        "children": []
    },
    {
        "id": 43,
        "target": "doctor",
        "name": "Пульмонолог",
        "slug": "pulymonolog",
        "icon": null,
        "children": []
    },
    {
        "id": 44,
        "target": "doctor",
        "name": "Ревматолог",
        "slug": "revmatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 45,
        "target": "doctor",
        "name": "Эндоскопист",
        "slug": "endoskopist",
        "icon": null,
        "children": []
    },
    {
        "id": 46,
        "target": "doctor",
        "name": "Физиотерапевт",
        "slug": "fizioterapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 47,
        "target": "doctor",
        "name": "Андролог",
        "slug": "androlog",
        "icon": null,
        "children": []
    },
    {
        "id": 48,
        "target": "doctor",
        "name": "Трихолог",
        "slug": "triholog",
        "icon": null,
        "children": []
    },
    {
        "id": 49,
        "target": "doctor",
        "name": "Косметолог",
        "slug": "kosmetolog",
        "icon": null,
        "children": []
    },
    {
        "id": 50,
        "target": "doctor",
        "name": "Массажист",
        "slug": "massazhist",
        "icon": null,
        "children": []
    },
    {
        "id": 51,
        "target": "doctor",
        "name": "Валеолог",
        "slug": "valeolog",
        "icon": null,
        "children": []
    },
    {
        "id": 52,
        "target": "doctor",
        "name": "Радиолог",
        "slug": "radiolog",
        "icon": null,
        "children": []
    },
    {
        "id": 53,
        "target": "doctor",
        "name": "Детский кардиоревматолог",
        "slug": "detskiy-kardiorevmatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 54,
        "target": "doctor",
        "name": "Педиатр",
        "slug": "pediatr",
        "icon": null,
        "children": []
    },
    {
        "id": 55,
        "target": "doctor",
        "name": "Невропатолог",
        "slug": "nevropatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 56,
        "target": "doctor",
        "name": "Детский невролог",
        "slug": "detskiy-nevrolog",
        "icon": null,
        "children": []
    },
    {
        "id": 57,
        "target": "doctor",
        "name": "Хирург",
        "slug": "hirurg",
        "icon": null,
        "children": []
    },
    {
        "id": 58,
        "target": "doctor",
        "name": "Иммунолог",
        "slug": "immunolog",
        "icon": null,
        "children": []
    },
    {
        "id": 59,
        "target": "doctor",
        "name": "Дерматовенеролог",
        "slug": "dermatovenerolog",
        "icon": null,
        "children": []
    },
    {
        "id": 60,
        "target": "doctor",
        "name": "Микробиолог",
        "slug": "mikrobiolog",
        "icon": null,
        "children": []
    },
    {
        "id": 61,
        "target": "doctor",
        "name": "Миколог",
        "slug": "mikolog",
        "icon": null,
        "children": []
    },
    {
        "id": 62,
        "target": "doctor",
        "name": "Проктолог",
        "slug": "proktolog",
        "icon": null,
        "children": []
    },
    {
        "id": 64,
        "target": "doctor",
        "name": "Онколог",
        "slug": "onkolog",
        "icon": null,
        "children": []
    },
    {
        "id": 65,
        "target": "doctor",
        "name": "Онкогинеколог",
        "slug": "onkoginekolog",
        "icon": null,
        "children": []
    },
    {
        "id": 66,
        "target": "doctor",
        "name": "Онкохирург",
        "slug": "onkohirurg",
        "icon": null,
        "children": []
    },
    {
        "id": 67,
        "target": "doctor",
        "name": "Сексопатолог",
        "slug": "seksopatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 68,
        "target": "doctor",
        "name": "Эпилептолог",
        "slug": "epileptolog",
        "icon": null,
        "children": []
    },
    {
        "id": 69,
        "target": "doctor",
        "name": "Оториноларинголог",
        "slug": "otorinolaringolog",
        "icon": null,
        "children": []
    },
    {
        "id": 70,
        "target": "doctor",
        "name": "Психиатр",
        "slug": "psihiatr",
        "icon": null,
        "children": []
    },
    {
        "id": 71,
        "target": "doctor",
        "name": "Генетик",
        "slug": "genetik",
        "icon": null,
        "children": []
    },
    {
        "id": 84,
        "target": "doctor",
        "name": "Паразитолог",
        "slug": "parazitolog",
        "icon": null,
        "children": []
    },
    {
        "id": 72,
        "target": "doctor",
        "name": "Вегетолог",
        "slug": "vegetolog",
        "icon": null,
        "children": []
    },
    {
        "id": 73,
        "target": "doctor",
        "name": "Детский массажист ",
        "slug": "detskiy-massazhist",
        "icon": null,
        "children": []
    },
    {
        "id": 74,
        "target": "doctor",
        "name": "Пластический хирург",
        "slug": "plasticheskiy-hirurg",
        "icon": null,
        "children": []
    },
    {
        "id": 75,
        "target": "doctor",
        "name": "Дерматокосметолог",
        "slug": "dermatokosmetolog",
        "icon": null,
        "children": []
    },
    {
        "id": 85,
        "target": "doctor",
        "name": "Акушер-гинеколог",
        "slug": "akusher-ginekolog",
        "icon": null,
        "children": []
    },
    {
        "id": 76,
        "target": "doctor",
        "name": "Иглотерапевт",
        "slug": "igloterapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 77,
        "target": "doctor",
        "name": "Кардиохирург",
        "slug": "kardiohirurg",
        "icon": null,
        "children": []
    },
    {
        "id": 78,
        "target": "doctor",
        "name": "Флеболог",
        "slug": "flebolog",
        "icon": null,
        "children": []
    },
    {
        "id": 79,
        "target": "doctor",
        "name": "Онкодерматолог",
        "slug": "onkodermatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 80,
        "target": "doctor",
        "name": "Артролог",
        "slug": "artrolog",
        "icon": null,
        "children": []
    },
    {
        "id": 81,
        "target": "doctor",
        "name": "Гепатолог",
        "slug": "gepatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 82,
        "target": "doctor",
        "name": "Нейрофизиолог",
        "slug": "neyrofiziolog",
        "icon": null,
        "children": []
    },
    {
        "id": 83,
        "target": "doctor",
        "name": "Гематолог",
        "slug": "gematolog",
        "icon": null,
        "children": []
    },
    {
        "id": 86,
        "target": "doctor",
        "name": "МРТ-специалист",
        "slug": "mrt-spetsialist",
        "icon": null,
        "children": []
    },
    {
        "id": 87,
        "target": "doctor",
        "name": "МСКТ-специалист",
        "slug": "mskt-spetsialist",
        "icon": null,
        "children": []
    },
    {
        "id": 88,
        "target": "doctor",
        "name": "Анестезиолог",
        "slug": "anesteziolog",
        "icon": null,
        "children": []
    },
    {
        "id": 89,
        "target": "doctor",
        "name": "Реаниматолог",
        "slug": "reanimatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 90,
        "target": "doctor",
        "name": "Врач функциональной диагностики",
        "slug": "vrach-funktsionalynoy-diagnostiki",
        "icon": null,
        "children": []
    },
    {
        "id": 91,
        "target": "doctor",
        "name": "Эндоуролог",
        "slug": "endourolog",
        "icon": null,
        "children": []
    },
    {
        "id": 92,
        "target": "doctor",
        "name": "Нарколог",
        "slug": "narkolog",
        "icon": null,
        "children": []
    },
    {
        "id": 93,
        "target": "doctor",
        "name": "Офтальмолог",
        "slug": "oftalymolog",
        "icon": null,
        "children": []
    },
    {
        "id": 94,
        "target": "doctor",
        "name": "Окулист",
        "slug": "okulist",
        "icon": null,
        "children": []
    },
    {
        "id": 95,
        "target": "doctor",
        "name": "Кольпоскопист",
        "slug": "kolyposkopist",
        "icon": null,
        "children": []
    },
    {
        "id": 96,
        "target": "doctor",
        "name": "Гастроскопист",
        "slug": "gastroskopist",
        "icon": null,
        "children": []
    },
    {
        "id": 97,
        "target": "doctor",
        "name": "Нефролог",
        "slug": "nefrolog",
        "icon": null,
        "children": []
    },
    {
        "id": 98,
        "target": "doctor",
        "name": "Подиатр",
        "slug": "podiatr",
        "icon": null,
        "children": []
    },
    {
        "id": 99,
        "target": "doctor",
        "name": "Неонатолог",
        "slug": "neonatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 100,
        "target": "doctor",
        "name": "Детский травматолог",
        "slug": "detskiy-travmatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 101,
        "target": "doctor",
        "name": "Трансплантолог",
        "slug": "transplantolog",
        "icon": null,
        "children": []
    },
    {
        "id": 102,
        "target": "doctor",
        "name": "Детский терапевт",
        "slug": "detskiy-terapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 103,
        "target": "doctor",
        "name": "Аритмолог",
        "slug": "aritmolog",
        "icon": null,
        "children": []
    },
    {
        "id": 104,
        "target": "doctor",
        "name": "Остеопат",
        "slug": "osteopat",
        "icon": null,
        "children": []
    },
    {
        "id": 105,
        "target": "doctor",
        "name": "Детский реабилитолог",
        "slug": "detskiy-reabilitolog",
        "icon": null,
        "children": []
    },
    {
        "id": 106,
        "target": "doctor",
        "name": "Реабилитолог",
        "slug": "reabilitolog",
        "icon": null,
        "children": []
    },
    {
        "id": 107,
        "target": "doctor",
        "name": "Онкопроктолог",
        "slug": "onkoproktolog",
        "icon": null,
        "children": []
    },
    {
        "id": 108,
        "target": "doctor",
        "name": "Подолог",
        "slug": "podolog",
        "icon": null,
        "children": []
    },
    {
        "id": 109,
        "target": "doctor",
        "name": "Нейрохирург",
        "slug": "neyrohirurg",
        "icon": null,
        "children": []
    },
    {
        "id": 110,
        "target": "doctor",
        "name": "Кардиореаниматолог",
        "slug": "kardioreanimatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 111,
        "target": "doctor",
        "name": "Кардиографист",
        "slug": "kardiografist",
        "icon": null,
        "children": []
    },
    {
        "id": 112,
        "target": "doctor",
        "name": "Психолог",
        "slug": "psiholog",
        "icon": null,
        "children": []
    },
    {
        "id": 113,
        "target": "doctor",
        "name": "Онкоуролог",
        "slug": "onkourolog",
        "icon": null,
        "children": []
    },
    {
        "id": 115,
        "target": "doctor",
        "name": "Имплантолог",
        "slug": "implantolog",
        "icon": null,
        "children": []
    },
    {
        "id": 116,
        "target": "doctor",
        "name": "Кинезиолог",
        "slug": "kineziolog",
        "icon": null,
        "children": []
    },
    {
        "id": 117,
        "target": "doctor",
        "name": "Нейрореаниматолог",
        "slug": "neyroreanimatolog",
        "icon": null,
        "children": []
    },
    {
        "id": 118,
        "target": "doctor",
        "name": "Нейроуролог",
        "slug": "neyrourolog",
        "icon": null,
        "children": []
    },
    {
        "id": 119,
        "target": "doctor",
        "name": "Онкоофтальмолог",
        "slug": "onkooftalmolog",
        "icon": null,
        "children": []
    },
    {
        "id": 120,
        "target": "doctor",
        "name": "Детский офтальмолог",
        "slug": "detskiy-oftalmolog",
        "icon": null,
        "children": []
    },
    {
        "id": 121,
        "target": "doctor",
        "name": "Сомнолог",
        "slug": "Somnolog",
        "icon": null,
        "children": []
    },
    {
        "id": 122,
        "target": "doctor",
        "name": "Кинезитерапевт",
        "slug": "Kineziterapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 123,
        "target": "doctor",
        "name": "Гирудотерапевт",
        "slug": "Girudoterapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 124,
        "target": "doctor",
        "name": "Психотерапевт",
        "slug": "Psixoterapevt",
        "icon": null,
        "children": []
    },
    {
        "id": 125,
        "target": "doctor",
        "name": "Нейропсихолог",
        "slug": "Neyropsixolog",
        "icon": null,
        "children": []
    }
],
  analyzes: [
    {
        "id": 299,
        "target": "organization",
        "name": "Сперма",
        "slug": "sperma",
        "icon": "a_8.svg",
        "children": [
            {
                "id": 300,
                "target": "organization",
                "name": "Спермограмма",
                "slug": "spermogramma",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 238,
        "target": "organization",
        "name": "Тесты на вирусы",
        "slug": "testi-na-virusi",
        "icon": "a_10.svg",
        "children": [
            {
                "id": 248,
                "target": "organization",
                "name": "Гепатит В",
                "slug": "gepatit-v",
                "icon": null,
                "children": [
                    {
                        "id": 250,
                        "target": "organization",
                        "name": "Гепатит В ПЦР тест",
                        "slug": "gepatit-v-ptsr-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 249,
                        "target": "organization",
                        "name": "Гепатит В ИФА тест",
                        "slug": "gepatit-v-ifa-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 254,
                "target": "organization",
                "name": "Гепатит D",
                "slug": "gepatit-d",
                "icon": null,
                "children": [
                    {
                        "id": 255,
                        "target": "organization",
                        "name": "Гепатит D ИФА тест",
                        "slug": "gepatit-d-ifa-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 256,
                        "target": "organization",
                        "name": "Гепатит D ПЦР тест",
                        "slug": "gepatit-d-ptsr-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 257,
                "target": "organization",
                "name": "ВПЧ (вирус папиломы человека)",
                "slug": "vpch-(virus-papilomi-cheloveka)",
                "icon": null,
                "children": [
                    {
                        "id": 259,
                        "target": "organization",
                        "name": "ВПЧ ИФА тест",
                        "slug": "vpch-ifa-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 258,
                        "target": "organization",
                        "name": "ВПЧ ПЦР тест",
                        "slug": "vpch-ptsr-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 239,
                "target": "organization",
                "name": "Вирус Герпеса",
                "slug": "virus-gerpesa",
                "icon": null,
                "children": [
                    {
                        "id": 241,
                        "target": "organization",
                        "name": "Вирус Герпеса ИФА тест",
                        "slug": "virus-gerpesa-ifa-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 240,
                        "target": "organization",
                        "name": "Вирус Герпеса ПЦР тест",
                        "slug": "virus-gerpesa-ptsr-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 263,
                "target": "organization",
                "name": "Краснуха",
                "slug": "krasnuha",
                "icon": null,
                "children": [
                    {
                        "id": 264,
                        "target": "organization",
                        "name": "Краснуха ИФА тест",
                        "slug": "krasnuha-ifa-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 260,
                "target": "organization",
                "name": "Вирус Эпштейна-Барра",
                "slug": "virus-epshteyna-barra",
                "icon": null,
                "children": [
                    {
                        "id": 262,
                        "target": "organization",
                        "name": "Вирус Эпштейна-Барра ИФА тест",
                        "slug": "virus-epshteyna-barra-ifa-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 261,
                        "target": "organization",
                        "name": "Вирус Эпштейна-Барра ПЦР тест",
                        "slug": "virus-epshteyna-barra-ptsr-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 265,
                "target": "organization",
                "name": "ВИЧ-СПИД",
                "slug": "vich-spid",
                "icon": null,
                "children": []
            },
            {
                "id": 251,
                "target": "organization",
                "name": "Гепатит С",
                "slug": "gepatit-s",
                "icon": null,
                "children": [
                    {
                        "id": 252,
                        "target": "organization",
                        "name": "Гепатит С ИФА тест",
                        "slug": "gepatit-s-ifa-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 253,
                        "target": "organization",
                        "name": "Гепатит С ПЦР тест",
                        "slug": "gepatit-s-ptsr-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 245,
                "target": "organization",
                "name": "Гепатит А",
                "slug": "gepatit-a",
                "icon": null,
                "children": [
                    {
                        "id": 247,
                        "target": "organization",
                        "name": "Гепатит А ПЦР тест",
                        "slug": "gepatit-a-ptsr-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 246,
                        "target": "organization",
                        "name": "Гепатит А ИФА тест",
                        "slug": "gepatit-a-ifa-test",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 242,
                "target": "organization",
                "name": "Цитомегаловирус",
                "slug": "tsitomegalovirus",
                "icon": null,
                "children": [
                    {
                        "id": 244,
                        "target": "organization",
                        "name": "Цитомегаловирус ПЦР тест",
                        "slug": "tsitomegalovirus-ptsr-test",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 243,
                        "target": "organization",
                        "name": "Цитомегаловирус ИФА тест",
                        "slug": "tsitomegalovirus-ifa-test",
                        "icon": null,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "id": 266,
        "target": "organization",
        "name": "Генетические тесты",
        "slug": "geneticheskie-testi",
        "icon": "a_4.svg",
        "children": [
            {
                "id": 274,
                "target": "organization",
                "name": "Онкогенетика",
                "slug": "onkogenetika",
                "icon": null,
                "children": []
            },
            {
                "id": 268,
                "target": "organization",
                "name": "Тесты на кариотипирование",
                "slug": "testi-na-kariotipirovanie",
                "icon": null,
                "children": []
            },
            {
                "id": 267,
                "target": "organization",
                "name": "Тесты на генотипирование",
                "slug": "testi-na-genotipirovanie",
                "icon": null,
                "children": []
            },
            {
                "id": 269,
                "target": "organization",
                "name": "ДНК тест",
                "slug": "dnk-test",
                "icon": null,
                "children": []
            },
            {
                "id": 270,
                "target": "organization",
                "name": "Генетическое исследование мужчин",
                "slug": "geneticheskoe-issledovanie-muzhchin",
                "icon": null,
                "children": []
            },
            {
                "id": 271,
                "target": "organization",
                "name": "Генетическое исследование женщин",
                "slug": "geneticheskoe-issledovanie-zhenshtin",
                "icon": null,
                "children": []
            },
            {
                "id": 272,
                "target": "organization",
                "name": "Генетические исследования сердца и сосудов",
                "slug": "geneticheskie-issledovaniya-serdtsa-i-sosudov",
                "icon": null,
                "children": []
            },
            {
                "id": 273,
                "target": "organization",
                "name": "Генетическое исследование коррекции веса",
                "slug": "geneticheskoe-issledovanie-korrektsii-vesa",
                "icon": null,
                "children": []
            },
            {
                "id": 275,
                "target": "organization",
                "name": "Генетическое исследование сахарного диабета",
                "slug": "geneticheskoe-issledovanie-saharnogo-diabeta",
                "icon": null,
                "children": []
            },
            {
                "id": 276,
                "target": "organization",
                "name": "Генетическое исследование непереносимости лактозы",
                "slug": "geneticheskoe-issledovanie-neperenosimosti-laktozi",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 222,
        "target": "organization",
        "name": "Кал",
        "slug": "kal",
        "icon": "a_5.svg",
        "children": [
            {
                "id": 223,
                "target": "organization",
                "name": "Общий анализ кала",
                "slug": "obshtiy-analiz-kala",
                "icon": null,
                "children": []
            },
            {
                "id": 224,
                "target": "organization",
                "name": "Анализ кала на глисты",
                "slug": "analiz-kala-na-glisti",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 126,
        "target": "organization",
        "name": "Кровь",
        "slug": "krovy",
        "icon": "a_3.svg",
        "children": [
            {
                "id": 163,
                "target": "organization",
                "name": "Анемия",
                "slug": "anemiya",
                "icon": null,
                "children": [
                    {
                        "id": 166,
                        "target": "organization",
                        "name": "Общая железосвязывающая способность ",
                        "slug": "obshtaya-zhelezosvyazivayushtaya-sposobnosty",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 167,
                        "target": "organization",
                        "name": "Ферритин",
                        "slug": "ferritin",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 165,
                        "target": "organization",
                        "name": "Трансферрин",
                        "slug": "transferrin",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 164,
                        "target": "organization",
                        "name": "Железо",
                        "slug": "zhelezo-1",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 168,
                "target": "organization",
                "name": "Тест на группу крови",
                "slug": "test-na-gruppu-krovi",
                "icon": null,
                "children": []
            },
            {
                "id": 158,
                "target": "organization",
                "name": "Общий анализ крови",
                "slug": "obshtiy-analiz-krovi",
                "icon": null,
                "children": []
            },
            {
                "id": 128,
                "target": "organization",
                "name": "Гормоны",
                "slug": "gormoni",
                "icon": null,
                "children": [
                    {
                        "id": 129,
                        "target": "organization",
                        "name": "Гормоны щитовидной железы",
                        "slug": "gormoni-shtitovidnoy-zhelezi",
                        "icon": null,
                        "children": [
                            {
                                "id": 130,
                                "target": "organization",
                                "name": "ТТГ",
                                "slug": "ttg",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 138,
                                "target": "organization",
                                "name": "АнтиТГ",
                                "slug": "antitg",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 134,
                                "target": "organization",
                                "name": "Т4 Тироксин",
                                "slug": "t4-tiroksin",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 136,
                                "target": "organization",
                                "name": "Т4 свободный",
                                "slug": "t4-svobodniy",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 132,
                                "target": "organization",
                                "name": "Т3 общий",
                                "slug": "t3-obshtiy",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 135,
                                "target": "organization",
                                "name": "Т4 общий",
                                "slug": "t4-obshtiy",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 137,
                                "target": "organization",
                                "name": "АнтиТПО",
                                "slug": "antitpo",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 131,
                                "target": "organization",
                                "name": "T3 Трийодтиронин",
                                "slug": "t3-triyodtironin",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 133,
                                "target": "organization",
                                "name": "Т3 свободный",
                                "slug": "t3-svobodniy",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 139,
                                "target": "organization",
                                "name": "Тиреоглобулин",
                                "slug": "tireoglobulin",
                                "icon": null,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 140,
                        "target": "organization",
                        "name": "Общие гормоны",
                        "slug": "obshtie-gormoni",
                        "icon": null,
                        "children": [
                            {
                                "id": 153,
                                "target": "organization",
                                "name": "ДГЕА-сульфат",
                                "slug": "dgea-sulyfat",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 145,
                                "target": "organization",
                                "name": "Эстрадиол",
                                "slug": "estradiol",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 147,
                                "target": "organization",
                                "name": "Свободный тестостерон",
                                "slug": "svobodniy-testosteron",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 142,
                                "target": "organization",
                                "name": "ЛГ",
                                "slug": "lg",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 154,
                                "target": "organization",
                                "name": "Антимюллеровский гормон",
                                "slug": "antimyullerovskiy-gormon",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 146,
                                "target": "organization",
                                "name": "Тестостерон",
                                "slug": "testosteron",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 157,
                                "target": "organization",
                                "name": "Дофамин",
                                "slug": "dofamin",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 148,
                                "target": "organization",
                                "name": "Пролактин",
                                "slug": "prolaktin",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 144,
                                "target": "organization",
                                "name": "Прогестерон",
                                "slug": "progesteron",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 149,
                                "target": "organization",
                                "name": "Кортизол",
                                "slug": "kortizol",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 152,
                                "target": "organization",
                                "name": "ГСПГ",
                                "slug": "gspg",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 155,
                                "target": "organization",
                                "name": "Мелатонин",
                                "slug": "melatonin",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 150,
                                "target": "organization",
                                "name": "17-OH прогестерон",
                                "slug": "17-oh-progesteron",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 156,
                                "target": "organization",
                                "name": "Адреналин",
                                "slug": "adrenalin",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 143,
                                "target": "organization",
                                "name": "ХГЧ",
                                "slug": "hgch",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 151,
                                "target": "organization",
                                "name": "Гормон роста",
                                "slug": "gormon-rosta",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 141,
                                "target": "organization",
                                "name": "ФСГ",
                                "slug": "fsg",
                                "icon": null,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 127,
                "target": "organization",
                "name": "Коагулограмма",
                "slug": "koagulogramma",
                "icon": null,
                "children": []
            },
            {
                "id": 159,
                "target": "organization",
                "name": "Ревмопробы",
                "slug": "revmoprobi",
                "icon": null,
                "children": [
                    {
                        "id": 161,
                        "target": "organization",
                        "name": "С-реактивный белок",
                        "slug": "s-reaktivniy-belok",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 160,
                        "target": "organization",
                        "name": "Антистрептолизин О (ASLO)",
                        "slug": "antistreptolizin-o-(aslo)",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 162,
                        "target": "organization",
                        "name": "Ревматоидный фактор",
                        "slug": "revmatoidniy-faktor",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 169,
                "target": "organization",
                "name": "Печеночные пробы",
                "slug": "pechenochnie-probi",
                "icon": null,
                "children": [
                    {
                        "id": 173,
                        "target": "organization",
                        "name": "Щелочная фосфатаза",
                        "slug": "shtelochnaya-fosfataza",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 174,
                        "target": "organization",
                        "name": "Альбумин",
                        "slug": "alybumin",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 172,
                        "target": "organization",
                        "name": "Билирубин",
                        "slug": "bilirubin",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 171,
                        "target": "organization",
                        "name": "АСТ",
                        "slug": "ast",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 170,
                        "target": "organization",
                        "name": "АЛТ",
                        "slug": "alt",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 175,
                "target": "organization",
                "name": "Микроэлементы",
                "slug": "mikroelementi",
                "icon": null,
                "children": [
                    {
                        "id": 177,
                        "target": "organization",
                        "name": "Магний",
                        "slug": "magniy",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 178,
                        "target": "organization",
                        "name": "Фтор",
                        "slug": "ftor",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 184,
                        "target": "organization",
                        "name": "Бикарбонат",
                        "slug": "bikarbonat",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 179,
                        "target": "organization",
                        "name": "Железо",
                        "slug": "zhelezo",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 186,
                        "target": "organization",
                        "name": "Цинк",
                        "slug": "tsink",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 180,
                        "target": "organization",
                        "name": "Натрий",
                        "slug": "natriy",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 185,
                        "target": "organization",
                        "name": "Хлор",
                        "slug": "hlor",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 182,
                        "target": "organization",
                        "name": "Фосфор",
                        "slug": "fosfor",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 176,
                        "target": "organization",
                        "name": "Калий",
                        "slug": "kaliy",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 183,
                        "target": "organization",
                        "name": "Литий",
                        "slug": "litiy",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 181,
                        "target": "organization",
                        "name": "Кальций",
                        "slug": "kalytsiy",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 187,
                "target": "organization",
                "name": "Витамины",
                "slug": "vitamini",
                "icon": null,
                "children": [
                    {
                        "id": 191,
                        "target": "organization",
                        "name": "Витамин А",
                        "slug": "vitamin-a",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 188,
                        "target": "organization",
                        "name": "Витамин D",
                        "slug": "vitamin-d",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 192,
                        "target": "organization",
                        "name": "Витамин В6",
                        "slug": "vitamin-v6",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 190,
                        "target": "organization",
                        "name": "Фолиевая кислота",
                        "slug": "folievaya-kislota",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 189,
                        "target": "organization",
                        "name": "Витамин В-12",
                        "slug": "vitamin-v-12",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 193,
                "target": "organization",
                "name": "Онкомаркеры",
                "slug": "onkomarkeri",
                "icon": null,
                "children": [
                    {
                        "id": 196,
                        "target": "organization",
                        "name": "CA 15-3",
                        "slug": "ca-15-3",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 206,
                        "target": "organization",
                        "name": "Индекс ROMA",
                        "slug": "indeks-roma",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 205,
                        "target": "organization",
                        "name": "SCCA",
                        "slug": "scca",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 203,
                        "target": "organization",
                        "name": "HER-2",
                        "slug": "her-2",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 199,
                        "target": "organization",
                        "name": "CEA",
                        "slug": "cea",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 200,
                        "target": "organization",
                        "name": "PSA",
                        "slug": "psa",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 197,
                        "target": "organization",
                        "name": "CA 19-9",
                        "slug": "ca-19-9",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 204,
                        "target": "organization",
                        "name": "CYFRA 21-1",
                        "slug": "cyfra-21-1",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 201,
                        "target": "organization",
                        "name": "HE4",
                        "slug": "he4",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 198,
                        "target": "organization",
                        "name": "CA 27-29",
                        "slug": "ca-27-29",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 202,
                        "target": "organization",
                        "name": "CA 72-4",
                        "slug": "ca-72-4",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 195,
                        "target": "organization",
                        "name": "CA 125",
                        "slug": "ca-125",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 194,
                        "target": "organization",
                        "name": "AFP",
                        "slug": "afp",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 207,
                "target": "organization",
                "name": "Диабет",
                "slug": "diabet",
                "icon": null,
                "children": [
                    {
                        "id": 210,
                        "target": "organization",
                        "name": "Инсулин",
                        "slug": "insulin",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 208,
                        "target": "organization",
                        "name": "Глюкоза",
                        "slug": "glyukoza",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 209,
                        "target": "organization",
                        "name": "Гликозилированный гемоглобин",
                        "slug": "glikozilirovanniy-gemoglobin",
                        "icon": null,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "id": 326,
        "target": "organization",
        "name": "Биопсия",
        "slug": "biopsiya",
        "icon": "a_2.svg",
        "children": []
    },
    {
        "id": 225,
        "target": "organization",
        "name": "Бактериальный посев",
        "slug": "bakterialyniy-posev",
        "icon": "a_1.svg",
        "children": [
            {
                "id": 236,
                "target": "organization",
                "name": "Бактериальный посев из глаза",
                "slug": "bakterialyniy-posev-iz-glaza",
                "icon": null,
                "children": []
            },
            {
                "id": 232,
                "target": "organization",
                "name": "Бактериальный посев мокроты",
                "slug": "bakterialyniy-posev-mokroti",
                "icon": null,
                "children": []
            },
            {
                "id": 233,
                "target": "organization",
                "name": "Бактериальный посев(гинекология)",
                "slug": "bakterialyniy-posev(ginekologiya)",
                "icon": null,
                "children": []
            },
            {
                "id": 226,
                "target": "organization",
                "name": "Бактериальный посев мочи",
                "slug": "bakterialyniy-posev-mochi",
                "icon": null,
                "children": []
            },
            {
                "id": 227,
                "target": "organization",
                "name": "Бактериальный посев кала",
                "slug": "bakterialyniy-posev-kala",
                "icon": null,
                "children": []
            },
            {
                "id": 228,
                "target": "organization",
                "name": "Бактериальный посев спермы",
                "slug": "bakterialyniy-posev-spermi",
                "icon": null,
                "children": []
            },
            {
                "id": 229,
                "target": "organization",
                "name": "Бактериальный посев из зева",
                "slug": "bakterialyniy-posev-iz-zeva",
                "icon": null,
                "children": []
            },
            {
                "id": 230,
                "target": "organization",
                "name": "Бактериальный посев из носа",
                "slug": "bakterialyniy-posev-iz-nosa",
                "icon": null,
                "children": []
            },
            {
                "id": 231,
                "target": "organization",
                "name": "Бактериальный посев из уха",
                "slug": "bakterialyniy-posev-iz-uha",
                "icon": null,
                "children": []
            },
            {
                "id": 234,
                "target": "organization",
                "name": "Бактериальный посев из уретры",
                "slug": "bakterialyniy-posev-iz-uretri",
                "icon": null,
                "children": []
            },
            {
                "id": 235,
                "target": "organization",
                "name": "Бактериальный посев грудного молока",
                "slug": "bakterialyniy-posev-grudnogo-moloka",
                "icon": null,
                "children": []
            },
            {
                "id": 237,
                "target": "organization",
                "name": "Бактериальный посев на дисбактериоз",
                "slug": "bakterialyniy-posev-na-disbakterioz",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 277,
        "target": "organization",
        "name": "Тесты на инфекции",
        "slug": "testi-na-infektsii",
        "icon": "a_12.svg",
        "children": [
            {
                "id": 291,
                "target": "organization",
                "name": "Тест на хеликобактер",
                "slug": "test-na-helikobakter",
                "icon": null,
                "children": []
            },
            {
                "id": 292,
                "target": "organization",
                "name": "Тест на стрептококк",
                "slug": "test-na-streptokokk",
                "icon": null,
                "children": []
            },
            {
                "id": 278,
                "target": "organization",
                "name": "Тесты на TORCH инфекции",
                "slug": "testi-na-torch-infektsii",
                "icon": null,
                "children": [
                    {
                        "id": 285,
                        "target": "organization",
                        "name": "Микоплазма",
                        "slug": "mikoplazma",
                        "icon": null,
                        "children": [
                            {
                                "id": 286,
                                "target": "organization",
                                "name": "Микоплазма ИФА тест",
                                "slug": "mikoplazma-ifa-test",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 287,
                                "target": "organization",
                                "name": "Микоплазма ПЦР тест",
                                "slug": "mikoplazma-ptsr-test",
                                "icon": null,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 288,
                        "target": "organization",
                        "name": "Токсоплазма",
                        "slug": "toksoplazma",
                        "icon": null,
                        "children": [
                            {
                                "id": 290,
                                "target": "organization",
                                "name": "Токсоплазма ПЦР тест",
                                "slug": "toksoplazma-ptsr-test",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 289,
                                "target": "organization",
                                "name": "Токсоплазма ИФА тест",
                                "slug": "toksoplazma-ifa-test",
                                "icon": null,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 279,
                        "target": "organization",
                        "name": "Хламидии",
                        "slug": "hlamidii",
                        "icon": null,
                        "children": [
                            {
                                "id": 281,
                                "target": "organization",
                                "name": "Хламидии ПЦР тест",
                                "slug": "hlamidii-ptsr-test",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 280,
                                "target": "organization",
                                "name": "Хламидии ИФА тест",
                                "slug": "hlamidii-ifa-test",
                                "icon": null,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 282,
                        "target": "organization",
                        "name": "Уреаплазма",
                        "slug": "ureaplazma",
                        "icon": null,
                        "children": [
                            {
                                "id": 284,
                                "target": "organization",
                                "name": "Уреаплазма ПЦР тест",
                                "slug": "ureaplazma-ptsr-test",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 283,
                                "target": "organization",
                                "name": "Уреаплазма ИФА тест",
                                "slug": "ureaplazma-ifa-test",
                                "icon": null,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 215,
        "target": "organization",
        "name": "Экспресс тесты",
        "slug": "ekspress-testi",
        "icon": "a_13.svg",
        "children": [
            {
                "id": 218,
                "target": "organization",
                "name": "Экспресс тест на сифилис",
                "slug": "ekspress-test-na-sifilis",
                "icon": null,
                "children": []
            },
            {
                "id": 216,
                "target": "organization",
                "name": "Экспресс тест на гепатит В",
                "slug": "ekspress-test-na-gepatit-v",
                "icon": null,
                "children": []
            },
            {
                "id": 217,
                "target": "organization",
                "name": "Экспресс тест на гепатит С",
                "slug": "ekspress-test-na-gepatit-s",
                "icon": null,
                "children": []
            },
            {
                "id": 219,
                "target": "organization",
                "name": "Экспресс тест на ВИЧ-СПИД",
                "slug": "ekspress-test-na-vich-spid",
                "icon": null,
                "children": []
            },
            {
                "id": 220,
                "target": "organization",
                "name": "Экспресс тест на бруцеллез",
                "slug": "ekspress-test-na-brutsellez",
                "icon": null,
                "children": []
            },
            {
                "id": 221,
                "target": "organization",
                "name": "Экспресс тест на сахар",
                "slug": "ekspress-test-na-sahar",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 211,
        "target": "organization",
        "name": "Моча",
        "slug": "mocha",
        "icon": "a_7.svg",
        "children": [
            {
                "id": 212,
                "target": "organization",
                "name": "Общий анализ мочи",
                "slug": "obshtiy-analiz-mochi",
                "icon": null,
                "children": []
            },
            {
                "id": 213,
                "target": "organization",
                "name": "Анализ мочи по Нечипоренко",
                "slug": "analiz-mochi-po-nechiporenko",
                "icon": null,
                "children": []
            },
            {
                "id": 214,
                "target": "organization",
                "name": "Исследование мочи по Зимницкому",
                "slug": "issledovanie-mochi-po-zimnitskomu",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 293,
        "target": "organization",
        "name": "Тесты на аллергию",
        "slug": "testi-na-allergiyu",
        "icon": "a_9.svg",
        "children": [
            {
                "id": 298,
                "target": "organization",
                "name": "Аллергия на плесень",
                "slug": "allergiya-na-pleseny",
                "icon": null,
                "children": []
            },
            {
                "id": 294,
                "target": "organization",
                "name": "Пищевая аллергия",
                "slug": "pishtevaya-allergiya",
                "icon": null,
                "children": []
            },
            {
                "id": 296,
                "target": "organization",
                "name": "Аллергия на животных",
                "slug": "allergiya-na-zhivotnih",
                "icon": null,
                "children": []
            },
            {
                "id": 297,
                "target": "organization",
                "name": "Бытовая аллергия",
                "slug": "bitovaya-allergiya",
                "icon": null,
                "children": []
            },
            {
                "id": 295,
                "target": "organization",
                "name": "Аллергия на растения",
                "slug": "allergiya-na-rasteniya",
                "icon": null,
                "children": []
            }
        ]
    }
],
  procedures: [
    {
        "id": 363,
        "target": "organization",
        "name": "Зубы?",
        "slug": "zubi?",
        "icon": "p_7.svg",
        "children": [
            {
                "id": 365,
                "target": "organization",
                "name": "Чистка зубов",
                "slug": "chistka-zubov",
                "icon": null,
                "children": []
            },
            {
                "id": 364,
                "target": "organization",
                "name": "Лечение кариеса",
                "slug": "lechenie-kariesa",
                "icon": null,
                "children": []
            },
            {
                "id": 366,
                "target": "organization",
                "name": "Удаление зуба",
                "slug": "udalenie-zuba",
                "icon": null,
                "children": []
            },
            {
                "id": 367,
                "target": "organization",
                "name": "Установка брекетов",
                "slug": "ustanovka-breketov",
                "icon": null,
                "children": []
            },
            {
                "id": 368,
                "target": "organization",
                "name": "Установка импланта",
                "slug": "ustanovka-implanta",
                "icon": null,
                "children": []
            },
            {
                "id": 369,
                "target": "organization",
                "name": "Отбеливание зубов",
                "slug": "otbelivanie-zubov",
                "icon": null,
                "children": []
            },
            {
                "id": 370,
                "target": "organization",
                "name": "Реставрация зуба",
                "slug": "restavratsiya-zuba",
                "icon": null,
                "children": []
            },
            {
                "id": 371,
                "target": "organization",
                "name": "Установка пломбы",
                "slug": "ustanovka-plombi",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 372,
        "target": "organization",
        "name": "Глаза?",
        "slug": "glaza",
        "icon": "p_4.svg",
        "children": [
            {
                "id": 373,
                "target": "organization",
                "name": "Промывание слезных путей",
                "slug": "promivanie-sleznih-putey",
                "icon": null,
                "children": []
            },
            {
                "id": 374,
                "target": "organization",
                "name": "УЗИ глаз",
                "slug": "uzi-glaz",
                "icon": null,
                "children": []
            },
            {
                "id": 375,
                "target": "organization",
                "name": "Первичный осмотр",
                "slug": "pervichniy-osmotr",
                "icon": null,
                "children": []
            },
            {
                "id": 376,
                "target": "organization",
                "name": "Измерение глазного давления",
                "slug": "izmerenie-glaznogo-davleniya",
                "icon": null,
                "children": []
            },
            {
                "id": 377,
                "target": "organization",
                "name": "Лазерное лечение глаз",
                "slug": "lazernoe-lechenie-glaz",
                "icon": null,
                "children": []
            },
            {
                "id": 378,
                "target": "organization",
                "name": "Подбор очков",
                "slug": "podbor-ochkov",
                "icon": null,
                "children": []
            },
            {
                "id": 379,
                "target": "organization",
                "name": "Лечение косоглазия",
                "slug": "lechenie-kosoglaziya",
                "icon": null,
                "children": []
            },
            {
                "id": 380,
                "target": "organization",
                "name": "Компьютерная томография глаза",
                "slug": "kompyyuternaya-tomografiya-glaza",
                "icon": null,
                "children": []
            },
            {
                "id": 381,
                "target": "organization",
                "name": "Хирургическое лечение катаракты",
                "slug": "hirurgicheskoe-lechenie-katarakti",
                "icon": null,
                "children": []
            },
            {
                "id": 382,
                "target": "organization",
                "name": "Хирургическое лечение глаукомы",
                "slug": "hirurgicheskoe-lechenie-glaukomi",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 384,
        "target": "organization",
        "name": "Общая диагностика?",
        "slug": "obshtaya-diagnostika?",
        "icon": "p_15.svg",
        "children": [
            {
                "id": 385,
                "target": "organization",
                "name": "УЗИ",
                "slug": "uzi",
                "icon": null,
                "children": [
                    {
                        "id": 386,
                        "target": "organization",
                        "name": "УЗИ щитовидной железы",
                        "slug": "uzi-shtitovidnoy-zhelezi",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 387,
                        "target": "organization",
                        "name": "УЗИ поджелудочной железы",
                        "slug": "uzi-podzheludochnoy-zhelezi",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 388,
                        "target": "organization",
                        "name": "УЗИ селезенки",
                        "slug": "uzi-selezenki",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 389,
                        "target": "organization",
                        "name": "УЗИ органов брюшной полости",
                        "slug": "uzi-organov-bryushnoy-polosti",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 390,
                        "target": "organization",
                        "name": "УЗИ почек и мочевого пузыря",
                        "slug": "uzi-pochek-i-mochevogo-puzirya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 391,
                        "target": "organization",
                        "name": "УЗИ органов малого таза",
                        "slug": "uzi-organov-malovogo-taza",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 392,
                        "target": "organization",
                        "name": "УЗИ печени и желчного пузыря",
                        "slug": "uzi-pecheni-i-zhelchnogo-puzirya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 393,
                        "target": "organization",
                        "name": "УЗИ мягких тканей",
                        "slug": "uzi-myagkih-tkaney",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 394,
                        "target": "organization",
                        "name": "УЗИ лимфатических узлов",
                        "slug": "uzi-limfaticheskih-uzlov",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 395,
                "target": "organization",
                "name": "Доплер",
                "slug": "dopler",
                "icon": null,
                "children": [
                    {
                        "id": 397,
                        "target": "organization",
                        "name": "Доплер щитовидной железы",
                        "slug": "dopler-shtitovidnoy-zhelezi",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 396,
                        "target": "organization",
                        "name": "Доплер сосудов почек",
                        "slug": "dopler-sosudov-pochek",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 398,
                        "target": "organization",
                        "name": "Доплер сосудов брюшной полости",
                        "slug": "dopler-sosudov-bryushnoy-polosti",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 399,
                "target": "organization",
                "name": "Компьютерная томография",
                "slug": "kompyyuternaya-tomografiya",
                "icon": null,
                "children": [
                    {
                        "id": 400,
                        "target": "organization",
                        "name": "Компьютерная томография верхней и нижней челюсти",
                        "slug": "kompyuternaya-tomografiya-verhney-i-nizhney-chelyusti",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 401,
                        "target": "organization",
                        "name": "Компьютерная томография гайморовой и лобной пазухи",
                        "slug": "kompyuternaya-tomografiya-gaymorovoy-i-lobnoy-pazuhi",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 402,
                        "target": "organization",
                        "name": "Компьютерная томография носовой перегородки",
                        "slug": "kompyuternaya-tomografiya-nosovoy-peregorodki",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 403,
                        "target": "organization",
                        "name": "Компьютерная томография височной кости",
                        "slug": "kompyuternaya-tomografiya-visechnoy-kosti",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 404,
                "target": "organization",
                "name": "МРТ",
                "slug": "mrt",
                "icon": null,
                "children": [
                    {
                        "id": 406,
                        "target": "organization",
                        "name": "МРТ брюшной полости",
                        "slug": "mrt-bryushnoy-polosti",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 405,
                        "target": "organization",
                        "name": "МРТ гипофиза",
                        "slug": "mrt-gipofiza",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 407,
                        "target": "organization",
                        "name": "МРТ малого таза",
                        "slug": "mrt-malovogo-taza",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 408,
                        "target": "organization",
                        "name": "МРТ сустава",
                        "slug": "mrt-sustava",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 409,
                        "target": "organization",
                        "name": "Открытый аппарат МРТ",
                        "slug": "otkritiy-apparat-mrt",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 410,
                "target": "organization",
                "name": "МСКТ",
                "slug": "mskt",
                "icon": null,
                "children": [
                    {
                        "id": 413,
                        "target": "organization",
                        "name": "МСКТ надпочечников",
                        "slug": "mskt-nadpochechnikov",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 411,
                        "target": "organization",
                        "name": "МСКТ брюшной полости",
                        "slug": "mskt-bryushnoy-polosti",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 412,
                        "target": "organization",
                        "name": "МСКТ малого таза",
                        "slug": "mskt-malovogo-taza",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 414,
                        "target": "organization",
                        "name": "МСКТ почек",
                        "slug": "mskt-pochek",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 415,
                        "target": "organization",
                        "name": "МСКТ суставов",
                        "slug": "mskt-sustavov",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 419,
                "target": "organization",
                "name": "Гастроскопия",
                "slug": "gastroskopiya",
                "icon": null,
                "children": []
            },
            {
                "id": 416,
                "target": "organization",
                "name": "Рентген",
                "slug": "rentgen",
                "icon": null,
                "children": [
                    {
                        "id": 417,
                        "target": "organization",
                        "name": "Рентген суставов",
                        "slug": "rentgen-sustavov",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 418,
                        "target": "organization",
                        "name": "Рентген костей",
                        "slug": "rentgen-kostey",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 420,
                "target": "organization",
                "name": "Электромиография",
                "slug": "elektromiografiya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 421,
        "target": "organization",
        "name": "Сердце❤️",
        "slug": "serdtse️",
        "icon": "p_17.svg",
        "children": [
            {
                "id": 422,
                "target": "organization",
                "name": "ЭКГ",
                "slug": "ekg",
                "icon": null,
                "children": []
            },
            {
                "id": 424,
                "target": "organization",
                "name": "УЗИ сердца",
                "slug": "uzi-serdtsa",
                "icon": null,
                "children": []
            },
            {
                "id": 423,
                "target": "organization",
                "name": "Ритмограмма",
                "slug": "ritmogramma",
                "icon": null,
                "children": []
            },
            {
                "id": 425,
                "target": "organization",
                "name": "Лечение аритмии",
                "slug": "lechenie-aritmii",
                "icon": null,
                "children": []
            },
            {
                "id": 426,
                "target": "organization",
                "name": "Установка монитора",
                "slug": "ustanovka-monitora",
                "icon": null,
                "children": []
            },
            {
                "id": 428,
                "target": "organization",
                "name": "Коронарография",
                "slug": "koronarografiya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 447,
        "target": "organization",
        "name": "Мужское здоровье??",
        "slug": "muzhskoe-zdorovye",
        "icon": "p_13.svg",
        "children": [
            {
                "id": 448,
                "target": "organization",
                "name": "УЗИ предстательной железы",
                "slug": "uzi-predstatelynoy-zhelezi",
                "icon": null,
                "children": []
            },
            {
                "id": 449,
                "target": "organization",
                "name": "УЗИ органов мошонки",
                "slug": "uzi-ogranov-moshonki",
                "icon": null,
                "children": []
            },
            {
                "id": 450,
                "target": "organization",
                "name": "Доплер органов мошонки",
                "slug": "dopler-organov-moshonki",
                "icon": null,
                "children": []
            },
            {
                "id": 451,
                "target": "organization",
                "name": "Доплер предстательной железы",
                "slug": "dopler-predstatelynoy-zhelezi",
                "icon": null,
                "children": []
            },
            {
                "id": 452,
                "target": "organization",
                "name": "Уретрограмма",
                "slug": "uretrogramma",
                "icon": null,
                "children": []
            },
            {
                "id": 453,
                "target": "organization",
                "name": "Недержание мочи",
                "slug": "siydikni-tutmaslik",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 429,
        "target": "organization",
        "name": "Голова?",
        "slug": "golova",
        "icon": "p_3.svg",
        "children": [
            {
                "id": 430,
                "target": "organization",
                "name": "ЭXO ЭГ",
                "slug": "exo-eg",
                "icon": null,
                "children": []
            },
            {
                "id": 431,
                "target": "organization",
                "name": "ЭЭГ",
                "slug": "eeg",
                "icon": null,
                "children": []
            },
            {
                "id": 432,
                "target": "organization",
                "name": "МРТ головного мозга",
                "slug": "mrt-golovnogo-mozga",
                "icon": null,
                "children": []
            },
            {
                "id": 433,
                "target": "organization",
                "name": "МСКТ головного мозга",
                "slug": "mskt-golovnogo-mozga",
                "icon": null,
                "children": []
            },
            {
                "id": 434,
                "target": "organization",
                "name": "Рентген черепа",
                "slug": "rentgen-cherepa",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 435,
        "target": "organization",
        "name": "Женское здоровье??",
        "slug": "zhenskoe-zdorovye",
        "icon": "p_6.svg",
        "children": [
            {
                "id": 436,
                "target": "organization",
                "name": "Кольпоскопия",
                "slug": "kolyposkopiya",
                "icon": null,
                "children": []
            },
            {
                "id": 438,
                "target": "organization",
                "name": "Фолликулометрия",
                "slug": "follikulometriya",
                "icon": null,
                "children": []
            },
            {
                "id": 437,
                "target": "organization",
                "name": "Доплер плода",
                "slug": "dopler-ploda",
                "icon": null,
                "children": []
            },
            {
                "id": 439,
                "target": "organization",
                "name": "УЗИ матки и яичников",
                "slug": "uzi-matki-i-yaichnikov",
                "icon": null,
                "children": []
            },
            {
                "id": 441,
                "target": "organization",
                "name": "Скрининг плода",
                "slug": "skrining-ploda",
                "icon": null,
                "children": []
            },
            {
                "id": 440,
                "target": "organization",
                "name": "УЗИ беременности",
                "slug": "uzi-beremennosti",
                "icon": null,
                "children": []
            },
            {
                "id": 442,
                "target": "organization",
                "name": "УЗИ молочных желез",
                "slug": "uzi-molochnih-zhelez",
                "icon": null,
                "children": []
            },
            {
                "id": 443,
                "target": "organization",
                "name": "Маммография",
                "slug": "mammografiya",
                "icon": null,
                "children": []
            },
            {
                "id": 444,
                "target": "organization",
                "name": "ЭХО КГ плода",
                "slug": "eho-kg-ploda",
                "icon": null,
                "children": []
            },
            {
                "id": 445,
                "target": "organization",
                "name": "Недержание мочи",
                "slug": "nederzhanie-mochi",
                "icon": null,
                "children": []
            },
            {
                "id": 446,
                "target": "organization",
                "name": "Гистероскопия",
                "slug": "gisteroskopiya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 454,
        "target": "organization",
        "name": "Волосы??",
        "slug": "volosi",
        "icon": "p_2.svg",
        "children": [
            {
                "id": 455,
                "target": "organization",
                "name": "Фототрихограмма",
                "slug": "fototrihogramma",
                "icon": null,
                "children": []
            },
            {
                "id": 456,
                "target": "organization",
                "name": "Трихоскопия",
                "slug": "trihoskopiya",
                "icon": null,
                "children": []
            },
            {
                "id": 457,
                "target": "organization",
                "name": "Трихопигментация",
                "slug": "trihopigmentatsiya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 459,
        "target": "organization",
        "name": "Позвоночник??",
        "slug": "pozvonochnik",
        "icon": "p_16.svg",
        "children": [
            {
                "id": 460,
                "target": "organization",
                "name": "МРТ шейного отдела позвоночника",
                "slug": "mrt-sheynogo-otdela-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 461,
                "target": "organization",
                "name": "МРТ грудного отдела позвоночника",
                "slug": "mrt-grudnogo-otdela-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 462,
                "target": "organization",
                "name": "МРТ пояснично-крестцового отдела позвоночника",
                "slug": "mrt-poyasnichno-kresttsovogo-otdela-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 463,
                "target": "organization",
                "name": "МСКТ позвоночника",
                "slug": "mskt-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 464,
                "target": "organization",
                "name": "Рентген позвоночника",
                "slug": "rentgen-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 465,
                "target": "organization",
                "name": "Вытяжение позвоночника",
                "slug": "vityazhenie-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 466,
                "target": "organization",
                "name": "Реабилитация межпозвоночных грыж",
                "slug": "reabilitatsiya-mezhpozvonochnih-grizh",
                "icon": null,
                "children": []
            },
            {
                "id": 467,
                "target": "organization",
                "name": "Удаление грыжи диска",
                "slug": "udalenie-grizhi-diska",
                "icon": null,
                "children": []
            },
            {
                "id": 468,
                "target": "organization",
                "name": "Статико-динамические исследования позвоночника",
                "slug": "statiko-dinamicheskie-issledovaniya-pozvonochnika",
                "icon": null,
                "children": []
            },
            {
                "id": 469,
                "target": "organization",
                "name": "Диагностика опорно-двигательного аппарата",
                "slug": "diagnostika-oporno-dvigatelynogo-apparata",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 470,
        "target": "organization",
        "name": "Сосуды и вены?",
        "slug": "sosudi-i-veni",
        "icon": "p_18.svg",
        "children": [
            {
                "id": 471,
                "target": "organization",
                "name": "Доплер сосудов конечностей",
                "slug": "dopler-sosudov-konechnostey",
                "icon": null,
                "children": []
            },
            {
                "id": 472,
                "target": "organization",
                "name": "Доплер вен конечностей",
                "slug": "dopler-ven-konechnostey",
                "icon": null,
                "children": []
            },
            {
                "id": 473,
                "target": "organization",
                "name": "Доплер брахиоцефальных сосудов",
                "slug": "dopler-brahiotsefalynih-sosudov",
                "icon": null,
                "children": []
            },
            {
                "id": 474,
                "target": "organization",
                "name": "Склеротерапия",
                "slug": "skleroterapiya",
                "icon": null,
                "children": []
            },
            {
                "id": 475,
                "target": "organization",
                "name": "МСКТ сосудов",
                "slug": "mskt-sosudov",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 476,
        "target": "organization",
        "name": "Наркомания и алкоголизм?",
        "slug": "narkomaniya-i-alkogolizm",
        "icon": "p_14.svg",
        "children": [
            {
                "id": 477,
                "target": "organization",
                "name": "Лечение алкоголизма",
                "slug": "lechenie-alkogolizma",
                "icon": null,
                "children": []
            },
            {
                "id": 478,
                "target": "organization",
                "name": "Лечение наркомании",
                "slug": "lechenie-narkomanii",
                "icon": null,
                "children": []
            },
            {
                "id": 479,
                "target": "organization",
                "name": "Кодирование от табакокурения",
                "slug": "kodirovanie-ot-tabakokureniya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 480,
        "target": "organization",
        "name": "Легкие?",
        "slug": "legkie",
        "icon": "p_12.svg",
        "children": [
            {
                "id": 481,
                "target": "organization",
                "name": "МСКТ грудной клетки",
                "slug": "mskt-grudnoy-kletki",
                "icon": null,
                "children": []
            },
            {
                "id": 482,
                "target": "organization",
                "name": "Рентген грудной клетки",
                "slug": "rentgen-grudnoy-kletki",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 483,
        "target": "organization",
        "name": "Хирургические операции✂️",
        "slug": "hirurgicheskie-operatsii️",
        "icon": null,
        "children": [
            {
                "id": 484,
                "target": "organization",
                "name": "Пластическая хирургия?",
                "slug": "plasticheskaya-hirurgiya",
                "icon": null,
                "children": [
                    {
                        "id": 485,
                        "target": "organization",
                        "name": "Блефаропластика",
                        "slug": "blefaroplastika",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 486,
                        "target": "organization",
                        "name": "Подтяжка лица",
                        "slug": "podtyazhka-litsa",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 492,
                        "target": "organization",
                        "name": "Пластика живота",
                        "slug": "plastika-zhivota",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 487,
                        "target": "organization",
                        "name": "Пластика ушей",
                        "slug": "plastika-ushey",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 489,
                        "target": "organization",
                        "name": "Ринопластика",
                        "slug": "rinoplastika",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 488,
                        "target": "organization",
                        "name": "Пластика губ",
                        "slug": "plastika-gub",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 490,
                        "target": "organization",
                        "name": "Пластика груди",
                        "slug": "plastika-grudi",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 491,
                        "target": "organization",
                        "name": "Пластика ягодиц",
                        "slug": "plastika-yagodits",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 493,
                        "target": "organization",
                        "name": "Интимная пластика",
                        "slug": "intimnaya-plastika",
                        "icon": null,
                        "children": [
                            {
                                "id": 494,
                                "target": "organization",
                                "name": "Женская интимная пластика",
                                "slug": "zhenskaya-intimnaya-plastika",
                                "icon": null,
                                "children": []
                            },
                            {
                                "id": 495,
                                "target": "organization",
                                "name": "Мужская интимная пластика",
                                "slug": "muzhskaya-intimnaya-plastika",
                                "icon": null,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 496,
                        "target": "organization",
                        "name": "Липосакция",
                        "slug": "liposaktsiya",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 497,
                "target": "organization",
                "name": "Лечебная хирургия??‍⚕️",
                "slug": "lechebnaya-hirurgiya‍️",
                "icon": null,
                "children": [
                    {
                        "id": 498,
                        "target": "organization",
                        "name": "Стентирование",
                        "slug": "stentirovanie",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 499,
                        "target": "organization",
                        "name": "Кардиохирургия",
                        "slug": "kardiohirurgiya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 500,
                        "target": "organization",
                        "name": "Гинекологические операции",
                        "slug": "ginekologicheskie-operatsii",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 501,
                        "target": "organization",
                        "name": "Урологические операции",
                        "slug": "urologicheskie-operatsii",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 502,
                        "target": "organization",
                        "name": "Проктологические операции",
                        "slug": "proktologicheskie-operatsii",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 503,
                        "target": "organization",
                        "name": "Лор-операции",
                        "slug": "lor-operatsii",
                        "icon": "lor.svg",
                        "children": []
                    },
                    {
                        "id": 504,
                        "target": "organization",
                        "name": "Лапароскопия",
                        "slug": "laparoskopiya",
                        "icon": null,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "id": 505,
        "target": "organization",
        "name": "Аппаратные процедуры?",
        "slug": "apparatnie-protseduri",
        "icon": "p_1.svg",
        "children": [
            {
                "id": 506,
                "target": "organization",
                "name": "Транскраниальная магнитная стимуляция",
                "slug": "transkranialynaya-magnitnaya-stimulyatsiya",
                "icon": null,
                "children": []
            },
            {
                "id": 507,
                "target": "organization",
                "name": "БОС - терапия",
                "slug": "bos-terapiya",
                "icon": null,
                "children": []
            },
            {
                "id": 508,
                "target": "organization",
                "name": "Внутривенное лазерное облучение крови",
                "slug": "vnutrivennoe-lazernoe-obluchenie-krovi",
                "icon": null,
                "children": []
            },
            {
                "id": 509,
                "target": "organization",
                "name": "Фиброскан",
                "slug": "fibroskan",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 510,
        "target": "organization",
        "name": "Дети????",
        "slug": "deti",
        "icon": "p_5.svg",
        "children": [
            {
                "id": 511,
                "target": "organization",
                "name": "УЗИ головного мозга",
                "slug": "uzi-golovnogo-mozga",
                "icon": null,
                "children": []
            },
            {
                "id": 512,
                "target": "organization",
                "name": "Детский массаж",
                "slug": "detskiy-massazh",
                "icon": null,
                "children": []
            },
            {
                "id": 513,
                "target": "organization",
                "name": "Стоматология дети",
                "slug": "stomatologiya-deti",
                "icon": null,
                "children": [
                    {
                        "id": 514,
                        "target": "organization",
                        "name": "Удаление зуба(дети)",
                        "slug": "udalenie-zuba(deti)",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 515,
                        "target": "organization",
                        "name": "Лечение кариеса(дети)",
                        "slug": "lechenie-kariesa(deti)",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 517,
                        "target": "organization",
                        "name": "Чистка зубов(дети)",
                        "slug": "chistka-zubov(deti)",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 516,
                        "target": "organization",
                        "name": "Установка пломбы(дети)",
                        "slug": "ustanovka-plombi(deti)",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 518,
                "target": "organization",
                "name": "Детский дневной стационар",
                "slug": "detskiy-dnevnoy-statsionar",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 519,
        "target": "organization",
        "name": "Эстетическая медицина?",
        "slug": "esteticheskaya-meditsina",
        "icon": "12.svg",
        "children": [
            {
                "id": 520,
                "target": "organization",
                "name": "Кожа??",
                "slug": "kozha",
                "icon": "p_10.svg",
                "children": [
                    {
                        "id": 521,
                        "target": "organization",
                        "name": "Удаление бородавок",
                        "slug": "udalenie-borodavok",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 522,
                        "target": "organization",
                        "name": "Удаление папиллом",
                        "slug": "udalenie-papillom",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 523,
                        "target": "organization",
                        "name": "Лазерное удаление новообразований",
                        "slug": "lazernoe-udalenie-novoobrazovaniy",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 524,
                        "target": "organization",
                        "name": "Лечение пигментаций",
                        "slug": "lechenie-pigmentatsiy",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 525,
                        "target": "organization",
                        "name": "Термолифтинг",
                        "slug": "termolifting",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 526,
                        "target": "organization",
                        "name": "Удаление татуировки",
                        "slug": "udalenie-tatuirovki",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 527,
                        "target": "organization",
                        "name": "Лифтинг лица",
                        "slug": "lifting-litsa",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 528,
                        "target": "organization",
                        "name": "Фототерапия",
                        "slug": "fototerapiya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 529,
                        "target": "organization",
                        "name": "Чистка лица",
                        "slug": "chistka-litsa",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 531,
                        "target": "organization",
                        "name": "Криолиполиз",
                        "slug": "kriolipoliz",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 532,
                        "target": "organization",
                        "name": "PRP терапия",
                        "slug": "prp-terapiya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 534,
                        "target": "organization",
                        "name": "SMAS лифтинг",
                        "slug": "smas-lifting",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 533,
                        "target": "organization",
                        "name": "Микроигольчатый лифтинг",
                        "slug": "mikroigolychatiy-lifting",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 537,
                        "target": "organization",
                        "name": "Дерматоскопия",
                        "slug": "dermatoskopiya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 538,
                        "target": "organization",
                        "name": "Озонотерапия",
                        "slug": "ozonoterapiya",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 539,
                "target": "organization",
                "name": "Интимная косметология?",
                "slug": "intimnaya-kosmetologiya",
                "icon": "p_8.svg",
                "children": [
                    {
                        "id": 540,
                        "target": "organization",
                        "name": "Лазерное интимное омоложение",
                        "slug": "lazernoe-intimnoe-omolozhenie",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 541,
                "target": "organization",
                "name": "Лазерная эпиляция",
                "slug": "lazernaya-epilyatsiya",
                "icon": "lips.svg",
                "children": []
            }
        ]
    },
    {
        "id": 328,
        "target": "organization",
        "name": "ЛОР-процедуры??",
        "slug": "lor-protseduri",
        "icon": "p_11.svg",
        "children": [
            {
                "id": 329,
                "target": "organization",
                "name": "Промывание носа",
                "slug": "promivanie-nosa",
                "icon": null,
                "children": []
            },
            {
                "id": 330,
                "target": "organization",
                "name": "Промывание горла",
                "slug": "promivanie-gorla",
                "icon": null,
                "children": []
            },
            {
                "id": 331,
                "target": "organization",
                "name": "Промывание уха",
                "slug": "promivanie-uha",
                "icon": null,
                "children": []
            },
            {
                "id": 332,
                "target": "organization",
                "name": "Ингаляция",
                "slug": "ingalyatsiya",
                "icon": null,
                "children": []
            },
            {
                "id": 333,
                "target": "organization",
                "name": "Рентген пазух носа",
                "slug": "rentgen-pazuh-nosa",
                "icon": null,
                "children": []
            },
            {
                "id": 334,
                "target": "organization",
                "name": "Тимпанометрия",
                "slug": "timpanometriya",
                "icon": null,
                "children": []
            },
            {
                "id": 335,
                "target": "organization",
                "name": "Аудиометрия",
                "slug": "audiometriya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 336,
        "target": "organization",
        "name": "Инъекции?",
        "slug": "inaektsii",
        "icon": "p_9.svg",
        "children": [
            {
                "id": 337,
                "target": "organization",
                "name": "Внутримышечные инъекции",
                "slug": "vnutrimishechnie-inaektsii",
                "icon": null,
                "children": []
            },
            {
                "id": 338,
                "target": "organization",
                "name": "Внутривенные инъекции",
                "slug": "vnutrivennie-inaektsii",
                "icon": null,
                "children": []
            },
            {
                "id": 339,
                "target": "organization",
                "name": "Капельница",
                "slug": "kapelynitsa",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 340,
        "target": "organization",
        "name": "ЭКО??",
        "slug": "eko",
        "icon": "eco.svg",
        "children": [
            {
                "id": 341,
                "target": "organization",
                "name": "Экстракорпоральное оплодотворение",
                "slug": "ekstrakorporalynoe-oplodotvorenie",
                "icon": null,
                "children": []
            },
            {
                "id": 342,
                "target": "organization",
                "name": "Инсеминация",
                "slug": "inseminatsiya",
                "icon": null,
                "children": []
            }
        ]
    },
    {
        "id": 344,
        "target": "organization",
        "name": "Физиотерапия??‍♂️",
        "slug": "fizioterapiya‍️",
        "icon": "p_19.svg",
        "children": [
            {
                "id": 353,
                "target": "organization",
                "name": "Гирудотерапия (пиявки)",
                "slug": "girudoterapiya-(piyavki)",
                "icon": null,
                "children": []
            },
            {
                "id": 355,
                "target": "organization",
                "name": "Мануальная терапия",
                "slug": "manualynaya-terapiya",
                "icon": null,
                "children": [
                    {
                        "id": 356,
                        "target": "organization",
                        "name": "Мануальная терапия позвоночника",
                        "slug": "manualynaya-terapiya-pozvonochnika",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 357,
                        "target": "organization",
                        "name": "Мануальная терапия живота",
                        "slug": "manualynaya-terapiya-zhivota",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 358,
                        "target": "organization",
                        "name": "Общая мануальная терапия",
                        "slug": "obshtaya-manualynaya-terapiya",
                        "icon": null,
                        "children": []
                    },
                    {
                        "id": 359,
                        "target": "organization",
                        "name": "Мануальная терапия головы",
                        "slug": "manualynaya-terapiya-golovi",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 360,
                "target": "organization",
                "name": "Криосауна",
                "slug": "kriosauna",
                "icon": null,
                "children": []
            },
            {
                "id": 361,
                "target": "organization",
                "name": "Гальванотерапия (электрический ток)",
                "slug": "galyvanoterapiya-(elektricheskiy-tok)",
                "icon": null,
                "children": []
            },
            {
                "id": 346,
                "target": "organization",
                "name": "Ультразвуковая терапия",
                "slug": "ulytrazvukovaya-terapiya",
                "icon": null,
                "children": []
            },
            {
                "id": 347,
                "target": "organization",
                "name": "Иглотерапия",
                "slug": "igloterapiya",
                "icon": null,
                "children": []
            },
            {
                "id": 348,
                "target": "organization",
                "name": "Дарсонваль",
                "slug": "darsenval",
                "icon": null,
                "children": []
            },
            {
                "id": 349,
                "target": "organization",
                "name": "Массаж",
                "slug": "massazh",
                "icon": null,
                "children": [
                    {
                        "id": 350,
                        "target": "organization",
                        "name": "Общий массаж (взрослые)",
                        "slug": "obshtiy-massazh-(vzroslie)",
                        "icon": null,
                        "children": []
                    }
                ]
            },
            {
                "id": 351,
                "target": "organization",
                "name": "Лазерная терапия",
                "slug": "lazernaya-terapiya",
                "icon": null,
                "children": []
            },
            {
                "id": 352,
                "target": "organization",
                "name": "Магнитотерапия",
                "slug": "magnitoterapiya",
                "icon": null,
                "children": []
            },
            {
                "id": 354,
                "target": "organization",
                "name": "Хиджама",
                "slug": "hizhama",
                "icon": null,
                "children": []
            },
            {
                "id": 345,
                "target": "organization",
                "name": "Электрофорез",
                "slug": "elektroforez",
                "icon": null,
                "children": []
            }
        ]
    }
],
  regions: [
        {
            "id": 2,
            "type": "city",
            "name": "Ташкент",
            "slug": "tashkent",
            "iso_code": "tk",
            "longitude": 41,
            "latitude": 64,
            "children": [
                {
                    "id": 21,
                    "type": "district",
                    "name": "Бектемирский район",
                    "slug": "bektemirskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 22,
                    "type": "district",
                    "name": "Юнусабадский район",
                    "slug": "yunusabadskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 23,
                    "type": "district",
                    "name": "Сергелийский район",
                    "slug": "sergeliyskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 24,
                    "type": "district",
                    "name": "Мирабадский район",
                    "slug": "mirabadskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 25,
                    "type": "district",
                    "name": "Яшнабадский район",
                    "slug": "yashnabadskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 26,
                    "type": "district",
                    "name": "Чиланзарский район",
                    "slug": "chilanzarskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 27,
                    "type": "district",
                    "name": "Учтепинский район",
                    "slug": "uchtepinskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 28,
                    "type": "district",
                    "name": "Яккасарайский район",
                    "slug": "yakkasarayskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 29,
                    "type": "district",
                    "name": "Алмазарский район",
                    "slug": "almazarskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 30,
                    "type": "district",
                    "name": "Мирзо Улугбекский район",
                    "slug": "mirzo-ulugbekskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 31,
                    "type": "district",
                    "name": "Янгихаётский район",
                    "slug": "yangihaiotskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 32,
                    "type": "district",
                    "name": "Шайхантахурский район",
                    "slug": "shayhantahurskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                }
            ]
        },
        {
            "id": 3,
            "type": "region",
            "name": "Республика Каракалпакстан",
            "slug": "respublika-karakalpakstan",
            "iso_code": "qr",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 4,
            "type": "region",
            "name": "Андижанская область",
            "slug": "andizanskaia-oblast",
            "iso_code": "an",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 5,
            "type": "region",
            "name": "Бухарская область",
            "slug": "buxarskaia-oblast",
            "iso_code": "bu",
            "longitude": 41,
            "latitude": 64,
            "children": [
                {
                    "id": 17,
                    "type": "city",
                    "name": "Бухара",
                    "slug": "buxara",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                }
            ]
        },
        {
            "id": 21,
            "type": "district",
            "name": "Бектемирский район",
            "slug": "bektemirskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 22,
            "type": "district",
            "name": "Юнусабадский район",
            "slug": "yunusabadskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 6,
            "type": "region",
            "name": "Джизакская область",
            "slug": "dzizakskaia-oblast",
            "iso_code": "ji",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 7,
            "type": "region",
            "name": "Кашкадарьинская область",
            "slug": "kaskadarinskaia-oblast",
            "iso_code": "qa",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 8,
            "type": "region",
            "name": "Навоийская область",
            "slug": "navoiiskaia-oblast",
            "iso_code": "nw",
            "longitude": 41,
            "latitude": 64,
            "children": [
                {
                    "id": 18,
                    "type": "city",
                    "name": "Навои",
                    "slug": "navoi",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                }
            ]
        },
        {
            "id": 17,
            "type": "city",
            "name": "Бухара",
            "slug": "buxara",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 16,
            "type": "city",
            "name": "Самарканд",
            "slug": "samarkand",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 18,
            "type": "city",
            "name": "Навои",
            "slug": "navoi",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 14,
            "type": "region",
            "name": "Ферганская область",
            "slug": "ferganskaia-oblast",
            "iso_code": "fa",
            "longitude": 41,
            "latitude": 64,
            "children": [
                {
                    "id": 19,
                    "type": "city",
                    "name": "Фершана",
                    "slug": "fersana",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                }
            ]
        },
        {
            "id": 15,
            "type": "region",
            "name": "Хорезмская область",
            "slug": "xorezmskaia-oblast",
            "iso_code": "xo",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 23,
            "type": "district",
            "name": "Сергелийский район",
            "slug": "sergeliyskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 24,
            "type": "district",
            "name": "Мирабадский район",
            "slug": "mirabadskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 25,
            "type": "district",
            "name": "Яшнабадский район",
            "slug": "yashnabadskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 20,
            "type": "city",
            "name": "Хожакент",
            "slug": "hozhakent",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 9,
            "type": "region",
            "name": "Наманганская область",
            "slug": "namanganskaia-oblast",
            "iso_code": "ng",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 10,
            "type": "region",
            "name": "Самаркандская область",
            "slug": "samarkandskaia-oblast",
            "iso_code": "sa",
            "longitude": 41,
            "latitude": 64,
            "children": [
                {
                    "id": 16,
                    "type": "city",
                    "name": "Самарканд",
                    "slug": "samarkand",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                }
            ]
        },
        {
            "id": 11,
            "type": "region",
            "name": "Сурхандарьинская область",
            "slug": "surxandarinskaia-oblast",
            "iso_code": "su",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 19,
            "type": "city",
            "name": "Фершана",
            "slug": "fersana",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 26,
            "type": "district",
            "name": "Чиланзарский район",
            "slug": "chilanzarskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 27,
            "type": "district",
            "name": "Учтепинский район",
            "slug": "uchtepinskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 28,
            "type": "district",
            "name": "Яккасарайский район",
            "slug": "yakkasarayskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 29,
            "type": "district",
            "name": "Алмазарский район",
            "slug": "almazarskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 30,
            "type": "district",
            "name": "Мирзо Улугбекский район",
            "slug": "mirzo-ulugbekskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 31,
            "type": "district",
            "name": "Янгихаётский район",
            "slug": "yangihaiotskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 12,
            "type": "region",
            "name": "Сырдарьинская область",
            "slug": "syrdarinskaia-oblast",
            "iso_code": "si",
            "longitude": 41,
            "latitude": 64,
            "children": []
        },
        {
            "id": 32,
            "type": "district",
            "name": "Шайхантахурский район",
            "slug": "shayhantahurskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 33,
            "type": "district",
            "name": "Зангиатинский район",
            "slug": "zangiatinskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 34,
            "type": "city",
            "name": "Город Чирчик",
            "slug": "gorod-chirchik",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        },
        {
            "id": 13,
            "type": "region",
            "name": "Ташкентская область",
            "slug": "taskentskaia-oblast",
            "iso_code": "to",
            "longitude": 41,
            "latitude": 64,
            "children": [
                {
                    "id": 20,
                    "type": "city",
                    "name": "Хожакент",
                    "slug": "hozhakent",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 33,
                    "type": "district",
                    "name": "Зангиатинский район",
                    "slug": "zangiatinskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 34,
                    "type": "city",
                    "name": "Город Чирчик",
                    "slug": "gorod-chirchik",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 35,
                    "type": "district",
                    "name": "Кибрайский район",
                    "slug": "kibrayskiy-rayon",
                    "iso_code": null,
                    "longitude": null,
                    "latitude": null
                }
            ]
        },
        {
            "id": 35,
            "type": "district",
            "name": "Кибрайский район",
            "slug": "kibrayskiy-rayon",
            "iso_code": null,
            "longitude": null,
            "latitude": null,
            "children": []
        }
    ]
}

const getters = {
  isEmptyState: (state) => {
    // if (!state.categories.length) return true;
    // if (!state.analyzes.length) return true;
    // if (!state.doctors.length) return true;
    // if (!state.procedures.length) return true;
    // if (!state.regions.length) return true;
    return false;
  },
  getCategories(state) {
    return state.categories
  },
  getDoctors(state) {
    const cloneDoctors = cloneDeep(state.doctors)
    const doctors = cloneDoctors.sort(compareFunc())
    let grouped = groupBy(doctors, (item) => item.name.slice(0, 1))
    return grouped
  },
  getAnalyzes(state) {
    const cloneAnalyzes = cloneDeep(state.analyzes)
    const analyzes = cloneAnalyzes.sort(compareFunc())
    return analyzes
  },
  getProcedures(state) {
    const cloneProcedures = cloneDeep(state.procedures)
    const procedures = cloneProcedures.sort(compareFunc())
    return procedures
  },
  getRegions(state) {
    const cloneRegions = cloneDeep(state.regions)
    const regions = cloneRegions.sort(compareFunc())
    return regions
  },
  menuItems(state) {
    const cloneCategories = cloneDeep(state.categories)
    let arr = [];
    for (let i = 1; i < cloneCategories.length; i++) {
        let item = cloneCategories[i];
        item.children = item.children.sort(compareFunc());
        arr.push(item);
    }
    return arr
  }
}

const mutations = {
  SET_CATEGORIES_AND_SORT(state, data) {
    state.categories = data.data
    state.doctors = state.categories[0].children
    // analyzes
    const analyzes = state.categories[2].children
    state.analyzes = analyzes
    // procedures
    const procedures = state.categories[1].children
    state.procedures = procedures
    // other
    const other = state.categories[3].children
    state.other = other
  },
  SET_REGIONS(state, data) {
    state.regions = data.data
  }
}

const actions = {
  async getCategories({ commit }) {
    try {
      const res = await this.$axios.get('/categories')
      commit('SET_CATEGORIES_AND_SORT', res.data)
    } catch (e) {
      console.log(e);
      throw e
    }
  },
  async getRegions({ commit }) {
    try {
      const res = await this.$axios.get('/locations')
      commit('SET_REGIONS', res.data)
    } catch (e) {
      // console.log(e.response);
      throw e
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}