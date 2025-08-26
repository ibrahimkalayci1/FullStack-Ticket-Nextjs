import connectMongo from "@/utils/connect-mongo";
import { NextResponse as Res} from "next/server";
import Ticket from "../../models/ticket";

type Params = {
    params:{
        id:string;
    }
}


export async function GET(req:Request, {params}:Params) {
    try {
        // veritabanına bağlan
       await connectMongo()

       // id si bilinen elemanı al
       const ticket = await Ticket.findById(params.id);

       // ticket bulunamazsa hata döndür
       if (!ticket) return Res.json({message: "Ticket bulunamadı"}, 
        {status:404} ) ;





            // ticket bulunursa veriyi döndür
        return Res.json({meassage:"Ticket bulundu", ticket});
    } catch (error) {
        return Res.json({message: "Ticket alınırken bir hata oluştu",
            error:error instanceof Error ? error.message : "Bilinmeyen hata"
        })
    }
}

export async function DELETE(req:Request, {params}:Params) {
    try {
      // veritabanına bağlan
   await connectMongo()
   // id si bilinen elemanı kaldır
   await Ticket.findByIdAndDelete(params.id)
         // client a cevap gönder
        return Res.json({meassage:"Ticket silindi"});
    } catch (error) {
        return Res.json({message: "Ticket silinirken bir hata oluştu",
            error:error instanceof Error ? error.message : "Bilinmeyen hata",
        },{status:400} )
    }
}

export async function PUT(req:Request, {params}:Params) {
    try {

      // veritabanına bağlan  
    await  connectMongo()

      // isteğin bodysinde gelen veriye eriş
      const body = await req.json();

      // veritabanındaki ticket i güncelle
      const updated = await Ticket.findByIdAndUpdate(params.id,body,{new:true});

                // client a cevap gönder
        return Res.json({meassage:"Ticket güncellendi", ticket:updated });
    } catch (error) {
        return Res.json({message: "Ticket güncellenirken bir hata oluştu",
            error:error instanceof Error ? error.message : "Bilinmeyen hata",
        }, {status:400} )
    }
}