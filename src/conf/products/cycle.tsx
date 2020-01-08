export default class CYCLE {
    static LIMIT = 10

    static CAROUSEL = {
        responsive: {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            }
        },
        renderButtonGroupOutside: true,
        centerMode: true,
        arrows: false,
        infinite: false
    };
}