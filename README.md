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
- Flow_Add_Step
- Flow_Delete_Step
- Flow_Validate_Step
- Flow_Upload_Document
- Flow_Modify_Step
- Modify_Flow
- Upload_Document
- ** Information **
- Send Data
- Call Data
- Audit Data
- **Notifications **
- Notifications
- ** Future **
- Create Asset
- Delete Asset
- Modify Asset
- Transfer Asset
- Assign Asset


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
: Requires approval from majority of partners

Get_Business_Flow_Info
: Return number of steps 
: Return parties involved

Flow_Add_Step(ArmadaID Business Flow ID, int stepNum, Armada ID validator, data data)
: Add new step to business flow
: Data will be parameters same as in the web interface

Flow_Delete_Step(ArmadaID Business Flow ID, int stepNum)
: Delete Step from Business Flow

Flow_Validate_Step(ArmadaID Business Flow ID, int stepNum)
: Validate step in business flow
: Must be from assigned validated party (not sure how we will validate for now)

Flow_Upload_Document(ArmadaID Business Flow ID, Document Document)
: Upload document to specific step in business flow

Flow_Modify_Step(ArmadaID Business Flow ID, int stepNum, data data)
: Modify existing step in business flow
: Need to define data that is going to be repalced (will improve this process)




