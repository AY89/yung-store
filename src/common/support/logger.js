
class Logger {

    enabled = true;
    level = "info"; // "info", "warn", "error"

    config(enabled, level) {
        this.enabled = enabled;
        this.level = level;
    }

    info(message) {
        if (canLog("info", this.level)) {
            console.info(message);
        }
    }

    warn(message) {
        if (canLog("warn", this.level)) {
            console.warn(message);
        }
    }

    error(message) {
        if (canLog("error", this.level)) {
            console.error(message);
        }
    }
}

function canLog(level, minLevel) {
    let levelPriority = getLevelPriority(level);
    let minLevelPriority = getLevelPriority(minLevel);

    return levelPriority >= minLevelPriority;
}

function getLevelPriority(level) {
    if (level === "info") {
        return 0;
    }
    else if (level === "warn") {
        return 1;
    }

    return 2;
}

let singleton = new Logger();
export default singleton