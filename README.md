# Open Waters

> *This module provides an easiest way to customer to inject itself into their existing project to send/retrieve encrypted data to Armada Platform All data will be send to Armada Consensus, encrypted and sent to HH using HCS and stored in Armada Consensus's database. The authentication and authorization is processed by an API key provided before*

## Functions:

- ** General **
- Create_Account
- Get_Account_Details 
- Get_Private_Key
- Update_Account_Details
- ** Business Flows **
- Create_Flow
- List_Active_Flows
- Destroy_Flow
- Get_Flow_Info
- Modify_Flow
- Upload_Document
- ** Information **
- Send Data
- Call Data
- Audit Data
- **Notifications **
- Notifications


### Specifics

Create_Account()
: Create new Armada Account

Get_Account_Details()
: Get associated information to account: Username, name, company, Armada ID

Get_Private_Key()
: Get Private key associated to account used to encrypt information

Update_Account_Details(String Field, Char input)
: Update respective field of account

Create_Flow(String Name, String Description, ArmadaID Partners, String Flow type)
: Create a new business flow 
: Returns Business Flow ID 

List_Active_Flows()
: Returns all active business flows in list format with name and ID

Destroy_Flow(ArmadaID Business Flow ID)
: Destroys business flow from ID
: Requires approval from majority of partners\

Get_Business_Flow_Info
: Return Steps 



