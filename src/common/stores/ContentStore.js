import { observable } from "mobx";

class ContentStore {

    @observable state = "initialized";
    error = null;

    load() {
        if (this.state !== "initialized") {
            return;
        }

        this.state = "loading";
        let promise = this.doLoad();
        if (promise != null) {
            promise.then(() => {
                this.state = "loaded";
            }, (error) => {
                this.error = error;
                this.state = "error";
            })
        }
        else {
            this.state = "loaded";
        }
    }

    doLoad() {
        // override
        return null;
    }
}

ContentStore.state = {
    initialized: "initialized",
    loading: "loading",
    loaded: "loaded",
    error: "error"
}

export default ContentStore;