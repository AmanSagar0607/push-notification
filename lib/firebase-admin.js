import { cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// Initialize Firebase Admin with service account credentials
const serviceAccount = {
  type: 'service_account',
  project_id: 'push-notification-1edfe',
  private_key_id: '26dec25c7f077c77c9d1efddd5a7a42ab07ff2ce',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJyJZo3zm69P07\n+sm8dQ6YcC/JT8UHXG70wiPE6iIg613bIRAswbQs9ZL4dFtv9VPtI4P9MIVBnVl7\nqsPMDnek3coZhjbmOABAkLMQtfW3+yp/z/iuWTnTR6WzzVr+MiwtTNBOB1OF3+XP\nan3sapf/h6/XRPTEzfOYjtoDougCj2nHr9vivx9Gaq6DjKQyUbbZXlOs/+sdz8fz\nwuaBUOfHh/NQ7Xacvq8LGclo6o6sOYpnc+0eIi+swZHeq0j0ulFAa0k6ILOG5F5Z\nR/OMAE/LegOcsC3jcEMkYd4bMSteHc+lroB82MitV7bwDdbKqHLn1jOPr2IVBHdN\n7bmXBm5/AgMBAAECggEAGuSTe0Wo/YxSRdCuW2IkgFePXt61TT5aAV/wgXmM8+M6\nno5hB/4HA+j03g0v9JN3TIcru65gTDbq6qr/Lm6NLplqqo0zOuqiyfgfDW6a4Zrl\ndqRiqeX1aX3GjViktHU+Ywk2R/f8/z4wdDzmrIAmYuWUH3Yuwx4Jxb7gOpTXJCP5\nP27eEGCKfxyhYMRgSKLTulzaKxE0HVyAvsJvgG/Rpbudar0ZR58j86OGpjDzwSe0\nHjGu3+P6FQ2ozZ89ATIcAH9UEoFLPBKvFeTWcfz80d+av5tCFq/G+Csnn/pNfeiI\nFro8vJWflehqxSR4oy0N3JzEU7xqMsUENHf70v8igQKBgQD0oEdcA5yu6C9HRNg5\n65ta5HJ48opR8vgdhoxdoCOhqhDvgejZsOFw3gjBPGLhxSKPRmgbQejbnDEDIiOb\nZYHoUe3IzMzS8ebEIg1yq4gwFhMxFxJROQNK1MELRV9LIXebAV3+oPB6LG03zXI7\nYLoKvsLBAYHwckCmFMkMQe6Z/wKBgQDTKl1zN7QUUYmZpRaoWjqbDbbkW9a85KiQ\nHTGpZtiY+GVaDgv0UIOOFDpOKFm4awLWb+h01MTmICKnHQOjDdjIhR1OqkeeerPq\nLugxklVPcUZjZ7Tg5wptpsZrIsmcld2GzV3ujpCfpRGTNcxXAIuAmW2xHZCkcAoO\npArkJBMrgQKBgAQSgv2aJcqXnOnf0IWuUWjC8tDmoLzagZzkN4P7fXxce2mxTPIK\nysX5PEYTPkYp5PhjoKoLf9fgEsTNlbApkW8Pphi4qBQ+6KuNMZIeHudGBs3DZ4+o\nllBxmEEax4pVpUsUS79IaJhwEuVh6yvn4VD6ef2Ci+o3zLG3GN22X0V7AoGAaDO7\nsaOHRY+G6z7AE4uS5/i4i6+WI9hiJduCKioKMFJDEVFlLMaeZHou22ql+48y80Z9\n20kzcKvi7bwvk0K9+xVVBQCaHuZF6gYDppKjbnRjW6JNa74XM0zdFPkxrAd4LZEi\nDRpk26LFLXOaxkQKkwcjTgdc3Qg8rkTc6v+yRgECgYBFY5z0oS6EU+GJLUjcbu40\nG7cYECaziW/dIxIpxO92adY7SLtwZp84t3C8LM7K+OsUitRja9aAkaJyEHQuWllC\nNT8MfybsEmZk0j6YHHKFbof1W7o/UXqlVrXooPO9Q0Blcm/9m2msj0zrh9nGFGro\n0K/qrEl9HjGkVA+cIsT5kg==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-fbsvc@push-notification-1edfe.iam.gserviceaccount.com',
  client_id: '109432408537865282787',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40push-notification-1edfe.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
};

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const admin = {
  messaging: () => getMessaging(app),
};