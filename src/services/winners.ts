import ProducerRepository from "../repositories/producerRepository";

interface ProducerGroupWinsDto {
    producer_id: number;
    name: string;
    wins: [
        {
            movie_id: number;
            title: string;
            year: number;
        }
    ];
    intervals?:
        | [
              {
                  interval: number;
                  previousWin: number;
                  followingWin: number;
              }
          ]
        | [];
}

class WinnersService {
    private producerRepo: ProducerRepository;

    constructor(producerRepo: ProducerRepository) {
        this.producerRepo = producerRepo;
    }

    async getMinMaxInterval() {
        const winners = await this.producerRepo.getAllWithWins();

        // Group producers with wins in array
        const multipleWinners: ProducerGroupWinsDto[] = winners
            .reduce((acc: ProducerGroupWinsDto[], cur) => {
                // check if producer already mapped
                const producer = acc.find(
                    (p: any) => p.producer_id === cur.producer_id
                );

                if (producer) {
                    producer.wins.push({
                        movie_id: cur.movie_id,
                        title: cur.title,
                        year: cur.year
                    });
                } else {
                    acc.push({
                        producer_id: cur.producer_id,
                        name: cur.name,
                        wins: [
                            {
                                movie_id: cur.movie_id,
                                title: cur.title,
                                year: cur.year
                            }
                        ]
                    });
                }

                return acc;
            }, [])
            .filter((p) => p.wins.length > 1);

        const intervals = multipleWinners
            .map((p) => {
                const sortedWins = p.wins.sort((a, b) => a.year - b.year);
                const producerIntervals = sortedWins
                    .slice(1)
                    .map((win, index) => ({
                        producer: p.name,
                        interval: win.year - sortedWins[index].year,
                        previousWin: sortedWins[index].year,
                        followingWin: win.year
                    }));
                return producerIntervals;
            })
            .flat();

        const minInterval = Math.min(...intervals.map((i) => i.interval));
        const maxInterval = Math.max(...intervals.map((i) => i.interval));

        const result = {
            min: intervals.filter((i) => i.interval === minInterval),
            max: intervals.filter((i) => i.interval === maxInterval)
        };

        return result;

        // for (const producer of multipleWinners) {
        //     const years = producer.wins
        //         .map((win) => win.year)
        //         .sort((a, b) => a - b);
        //     producer.intervals = [];
        // }
        console.log();
    }
}

export default WinnersService;
