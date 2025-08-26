import mongoose from "mongoose";


// env deki veritabanı url i
const MONGO_URI = process.env.MONGO_URI

//! NEXT JS NORMALDEN FARKLI OLARAK HER İSTEKTE VERİTABANINA BAĞLANMAK İSTER
//! ONUN İÇİN FONKSİYON YAZACAĞIZ

// mevcut bağlantıyı tutacağımız nesne
const cached: {
    connection?: typeof mongoose; //
    promise?:Promise<typeof mongoose>;
} = {}


// veritabanına bağlanacak ve bağlantıyı cache e atacak
// fonksiyon tekrar çağrıldığına zaten cache de mevcut bir 
// bağlantı varsa yenisini oluşturmak yerine cache dekini alacak

async function connectMongo():Promise<typeof mongoose>{
    if (!MONGO_URI) {
        throw new Error("Lütfen MONGO_URI değişkenini .env de tanımlayın");
    }

        // mevcut bir bağlantı varsa :
if (cached.connection) {
    // mevcut baglantıyı döndür yenisini oluşturma
    return cached.connection
}
        // mevcut bir bağlantı yoksa
    if (!cached.promise) {
        // yeni veritabanı bağlantısı oluştur
        cached.promise= mongoose.connect(MONGO_URI, {
            bufferCommands:false,
            //! buffercommands daha veritabanı bağlantısı kurulmamışken gelen sorguları
            //! bellekte tutup daha sonra çalıştırılmasını engeller
        });
    }

    // mevcut veritabanı promise e bağlanmaya çalış
    try {
      cached.connection = await cached.promise;
    } catch (err) {
cached.promise = undefined;
throw err;  
  }
// mevcut veritabanı bağlantsnı return et
return cached.connection;

}

export default connectMongo;