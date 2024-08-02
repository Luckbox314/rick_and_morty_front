import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data.message || error.statusText
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else if (error instanceof Response) {
        errorMessage = error.statusText;
    } else {
        console.error(error);
        errorMessage = 'An unknown error occurred';
    }

    console.error(error);

    return (
        <div>
            <h1>Oops!</h1>
            <p> An unexpected error has occurred.</p>
            <p>{errorMessage}</p>
        </div>
    )
}