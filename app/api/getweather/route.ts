import { NextRequest,NextResponse } from "next/server"

export async function POST(request: NextRequest){   
    // const reqBody = await request.json()
    // const {keyword} = reqBody
    // try{
    // const res = await fetch(`https://laws.e-gov.go.jp/api/2/keyword?keyword=${keyword}`)
    // if(!res.ok){
    //     throw new Error("e-Gov APIからのデータ取得に失敗しました")
    // }
    // const data = await res.json()
    // return NextResponse.json({message: "データ取得成功",data: data})
    // }catch(err: any){
    // console.error(err)
    // return NextResponse.json({message: "サーバー側でエラーが発生しました"})
    // }
}