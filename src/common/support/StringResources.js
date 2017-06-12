
export default {

    formatVideoSubTitle(video) {
        if (video.seriesName && video.seasonName) {
            return `${video.seriesName} - ${video.seasonName}`;
        }

        return "";
    }
}