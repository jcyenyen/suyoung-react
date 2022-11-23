

const moonPath =
    "M 27.5 0 C 34.791 0 41.79 2.899 46.945 8.055 C 52.101 13.21 55 20.209 55 27.5 C 55 34.791 52.101 41.79 46.945 46.945 C 41.79 52.101 34.791 55 27.5 55 C 20.209 55 13.21 52.101 8.055 46.945 C 2.899 41.79 0 34.791 0 27.5 C 0 20.209 2.899 13.21 8.055 8.055 C 13.21 2.899 20.209 0 27.5 0 Z";
const sunPath =
    "M 27.5 0 C 34.791 0 41.79 2.899 46.945 8.055 C 33.991 9.89 26.93 20.209 26.93 27.5 C 26.93 34.791 33.689 45.261 46.945 46.945 C 41.79 52.101 34.791 55 27.5 55 C 20.209 55 13.21 52.101 8.055 46.945 C 2.899 41.79 0 34.791 0 27.5 C 0 20.209 2.899 13.21 8.055 8.055 C 13.21 2.899 20.209 0 27.5 0 Z";
const darkMode = document.querySelector("#dark_mode");
let toggle = false;
//클릭
darkMode.addEventListener("click", () => {
    //anime.js
    //여기에 타임라인을 더한다
    const timeline = anime.timeline({
        duration: 750,
        easing: "easeOutExpo",
    });
    //add 다르 애니메이션 타임라인에
    timeline
        .add({
            targets: ".moon",
            d: [{ value: toggle ? moonPath : sunPath }], //moonPath ->sunpath
        })
        .add(
            {
                targets: "#dark_mode",
                rotate: toggle ? 0 : 320,
            },
            "-=350"
        )
        .add(
            {
                targets: "",
                backgroundColor: toggle
                    ? "rgba(255,255,255)"
                    : "rgba(22,22,22)",
                color: toggle ? "rgba(22,22,22)" : "rgba(255,255,255)",
            },
            "-=700"
        );

    if (!toggle) {
        toggle = true;
        // $("h1").text("darkmode");
    } else {
        toggle = false;
        // $("h1").text("lightmode");
    }
});
