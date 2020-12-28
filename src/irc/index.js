import { makeAutoObservable, observable} from "mobx"
import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Client from "./irc.js"

 class Store {
    ws!: WebSocket
    messages : Map<string ,Array<string>> = new Map()
    channels : Map<string ,Array<string>> = new Map()
    peers : Array<string> = []
    c : Client = new Client()
    currentChatWindow : string = ""
    @observable npeers : object = {}
    constructor() {
        makeAutoObservable(this)
        this.npeers = this.c.chans
        this.messages.set("Wall" , [])
        this.currentChatWindow = "Wall"
       // this.c.init()
        // this.c.on('private-msg' , (e) =>this.onMessage(e , false))
        // this.c.on('channel-msg' , (e) =>this.onMessage(e , true))
        // this.c.on('channel-join' , (e) =>this.onMemberJoin(e))
        // this.c.on('channel-part' , (e) =>this.onMemberPart(e))
        // this.c.on('members-list' , (e) =>this.onMembersList(e))
        this.c.on('motd' , (e) => console.log(e))
        this.c.on('join' , (e, f ,g ) =>{
            console.log(`channel joined ${e} ${f} ${g}`)
            this.npeers = this.c.chans
        } )
        this.c.on('message' , (e ,f ,g ) =>{ console.log(`message received ${e} ${f} ${g}`)
        
        console.log(this.c)
        })
        this.c.on('message#' , (e ,f ,g ) => console.log(`message received ${e} ${f} ${g}`))
    }
    onMembersList = (raw : string) =>{
        let tmp = raw.split('=')[1]
        let str = tmp.split(':')
        let chName = str[0].trim()
        let members = str[1].split(' ')
        this.channels.set(chName, members)
    }
    onMessage = (raw : string , ch=false) => {
        console.log(`triggering msg received with channel set to ` +ch)
        const msg = raw.split(' ') 
        let peer = ch  ?  msg[2] : msg[0]  
        console.log("in OnMessage " + peer)
        let msgs = this.messages.get(peer) 
        msgs ? this.messages.set(peer , [...msgs, raw]) : this.messages.set(peer , [...[raw]])
        ch  ?  this.addChannel(peer) : this.addPeer(peer)
       
    }
    addChannel = (chName : string) =>{
        (this.channels.get(chName)) ? null : this.channels.set(chName , [])
        (this.messages.get(chName)) ? null : this.messages.set(chName , [])
    }   
    onMemberJoin = (raw: string) =>{
      let str = raw.split(" ")
      let chName = str[2]
      let member = str[0]
      let ch = this.channels.get(chName)
       if (ch)  this.channels.set(chName , [...ch, member]) 
       else{ this.channels.set(chName, [member])}
       if (!this.messages.get(chName)) this.messages.set(chName , [])
    } 
    onMemberPart = (raw: string) =>{
        let str = raw.split(" ")
        let chName = str[2]
        let member = str[0]
        let ch = this.channels.get(chName)
        ch ? ch = ch.filter( item => item != member) :null
        this.channels.set(chName, ch)
       
    } 
    addtoWall = (raw :string) =>{
        let msgs = this.messages.get("Wall")
        msgs.push(raw)
        this.messages.set("Wall" , msgs)
    } 
    addPeer = (peer:string) => {
        !this.peers.includes(peer) ?   this.peers.push(peer) : 
        (this.messages.get(peer)) ? null : this.messages.set(peer , [])
    } 
    commitPeers = async () =>   await AsyncStorage.setItem('@ICILAVAL:peers' , JSON.stringify(this.peers)) 
    setCurrentChatWindow = (w : string) => this.currentChatWindow = w
    getWindowMessages(){return Array.from( this.messages.get(this.currentChatWindow) ) }
}









export const StoreContext = React.createContext()
export const store =  new Store()










