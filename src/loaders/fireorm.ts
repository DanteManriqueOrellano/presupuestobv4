import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
//import config from '../config';

export default async (): Promise<admin.firestore.Firestore> => {
    admin.initializeApp({
        credential: admin.credential.cert({

            projectId: "aquagratuitov1",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD3u/2hDe+ah/Nf\nxZp+TryrUbbuixuxDowsbmF62qTTdWrSF1EG+Bku47oNU5DBa8JU/EVVGXUqcIU0\nw4H4KIZ5RV1LgbMjtk6cBh6mAUdujUy2L8ziqL48FltorEdF0dxakNc35UNJY36b\nzFOgbx3HxljmIckkvQgb3/Bdq5fdd2M+uGqGpULmLC1h73jED5RoPJYQYtqGqVXq\nLxmbYAiitjZusaCbMqjJdUuZjWg8iU7x9jg1mKAU+WUhK6DWtVvUo5vSFYi9paDz\n7EYkEBvPO8igcoJx6FC9k4nZrdO4oDuDkudKuAJe3GGiERWzf/65x4gY0WD1Qiu+\nMdOxUTwTAgMBAAECggEAI+JaMbsICvVIXoYMA+G52IMEoXcK8tGtoj325snG+E5Y\nw8fW19CWLUGVUJrbK/lE8/R6woHmg9g6o1Lyf5S3LdfLVMWbwj+FEXqdc+RZiXz0\nMKup3Ocebyu53+aciFOGvKOgWRtfbMD5tO2a63FM+gQUGnmoXib3hrogYiEZ5V09\n0NQipEOHvNhrcfjAMSRkGKUGy9s2bwsmEVR9yTrGjGUK289LkgvahY6UxtEYoR8g\nNl2qjHdLbfQXvEF0e3lwGK47av6kAk2Li6pM0gUTK6xyivWqt7iLB3wm7ZQm20i9\n/7p0Z8GVmvCK1WSinpb3gpj5SmHQkP6ukW+7DqWjoQKBgQD833e1ZSoQ6JIotj3k\nzeTPnJo4PukrwbetAhX5gkXo1LADvISry4roklCS81DDbm8K+qetVwxXVnaCvFTi\nlm2Kjmcep0Ku3Vp3taY2iMyMvFYvtcNT+0JNEtYjvfUUrngtG2r+ecubHYQf0u8i\nXKwb/nyvbsLNqfbBJJ9zTaybkQKBgQD6zEFzL2RF6MdXo2jQ4isqtCR4tS+7DzkX\nz1qnE5zQPzCVbVL4R90hcrz/DNLdwQez+YV6Hn3VIQItmJxdvLyLE1AzBzmtU+oH\neX92C+HFQf3xYqEBZAi4ncpps8LELbyxKx3mpy2uaFzER0JPlokTa1JK1X+RygHH\n2XL5LOhjYwKBgQDUZsAeVYMoALIEEE+cyHTRDjFb3TvtzSGC6KWclpgyIbRW7xph\nUu6yu3OCe23zOed7yV7ecqejFLUmyxph2QjZwRNM5CFW0AcVVjbux6lI7UlXec0/\n1WSzaIcGLqCVZpb7DHSqm5MyD3DTalIDAuRt/yysDtUB+ymQwjpMl4nMgQKBgFNz\nice5GkWE2mfX8PWofDKedJBRwcsdmqLIlWKIzSIiFJl0IiqJRxRtKGQ5sSSmqViC\ni56B7N7xN9dSM52hQp+IUqRYICIDjRjlnbr64yoO9l/OsMJUte4wWvznGsTKb0II\nlc99C19ATLXm/DKdZYk3qc9K0UMCk6sbOP2eqsj/AoGAUtceqlefz3SHJmFoFASd\n0zqXHKu7La6xWcHIygMebEGpVAnZaRX94yMppukAoUk/DnhybN6rTjsAT6vJa1BN\nkY+xDIlzX5LeL5NPuiLi2siyu+UOlyjs28sdlGMwb1jTFxYE0mV5y2YeqVpUHK8c\nx2REYeMw3rc92cvQHQd6FaM=\n-----END PRIVATE KEY-----\n",
            clientEmail: "firebase-adminsdk-sr4ch@aquagratuitov1.iam.gserviceaccount.com"

        }),

        databaseURL: "https://aquagratuitov1.firebaseio.com",
    });
    const firestore = admin.firestore();
    
    return firestore;
};