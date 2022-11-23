import { useState, useEffect } from "react";

import Spinner from "./components/spinner";

export function useSpinner(timeout = 2000) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading)
            setTimeout(() => {
                setLoading(false);
            }, timeout);
    }, [loading]);

    //const SpinnerComponent = ({ loading }) => <Spinner loading={loading} />

    return {
        spinner: <Spinner loading={loading} />,
        setLoading,
    };
}
