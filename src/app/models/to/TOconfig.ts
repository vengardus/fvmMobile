// Generate by @vengardus 2019-03-15 22:17:12.929656

export class TOConfig {

   private isHostingServer:boolean;
   private ipLocalServer:string;
   private ipHostingServer:string;
   private dateCreate:string;
   private ipServer_edit:string;
   private username:string;
   private password:string;
   private initializeAction:boolean;
   private dateUpdateIp:string;
   private dateInitialize:string;

   constructor(itemDataStorage?:any) {
      if ( itemDataStorage != null ) {
         this.isHostingServer = itemDataStorage.isHostingServer;
         this.ipLocalServer = itemDataStorage.ipLocalServer;
         this.ipHostingServer = itemDataStorage.ipHostingServer;
         this.dateCreate = itemDataStorage.dateCreate;
         this.ipServer_edit = itemDataStorage.ipServer_edit;
         this.username = itemDataStorage.username;
         this.password = itemDataStorage.password;
         this.initializeAction = itemDataStorage.initializeAction;
         this.dateUpdateIp = itemDataStorage.dateUpdateIp;
         this.dateInitialize = itemDataStorage.dateInitialize;
      }
   }

   getIsHostingServer():boolean { return this.isHostingServer; }
   setIsHostingServer(value:boolean) { this.isHostingServer = value; }

   getIpLocalServer():string { return this.ipLocalServer; }
   setIpLocalServer(value:string) { this.ipLocalServer = value; }

   getIpHostingServer():string { return this.ipHostingServer; }
   setIpHostingServer(value:string) { this.ipHostingServer = value; }

   getDateCreate():string { return this.dateCreate; }
   setDateCreate(value:string) { this.dateCreate = value; }

   getIpServer_edit():string { return this.ipServer_edit; }
   setIpServer_edit(value:string) { this.ipServer_edit = value; }

   getUsername():string { return this.username; }
   setUsername(value:string) { this.username = value; }

   getPassword():string { return this.password; }
   setPassword(value:string) { this.password = value; }

   getInitializeAction():boolean { return this.initializeAction; }
   setInitializeAction(value:boolean) { this.initializeAction = value; }

   getDateUpdateIp():string { return this.dateUpdateIp; }
   setDateUpdateIp(value:string) { this.dateUpdateIp = value; }

   getDateInitialize():string { return this.dateInitialize; }
   setDateInitialize(value:string) { this.dateInitialize = value; }

}
