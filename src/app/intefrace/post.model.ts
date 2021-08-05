
export interface Post {
    status : {
        timestamp? : string,
        error_code? : number,
        error_message? : string,
        elapsed? : number,
        credit_count? : number,
        notice? : string,
        total_count? : number
    }
    
    data:CryptoData[]
}

export interface CryptoData {
    id?:number,
    name?:string,
    symbol?:string,
    slug?:string,
    num_market_pairs:number,
    date_added:string,
    tags?: string[], 
    max_supply:number,
    circulating_supply:number,
    total_supply:number,
    platform:any,
    cmc_rank:number,
    last_updated:string,
    quote:{
       USD:{
          price:number,
          volume_24h:number,
          percent_change_1h:number,
          percent_change_24h:number,
          percent_change_7d:number,
          percent_change_30d:number,
          percent_change_60d:number,
          percent_change_90d:number,
          market_cap:number,
          last_updated:string
       }
    }
 }