# Simple account creation, topic creation and post memo to topic for Hedera Hashgraph mainnet using Open Waters by
# Armada Chain Inc. This script first creates a Hedera Hashgraph account. Information gathered is set to anonymous,
# but used to personalize account on Armada Platform. Next it will generate a Hedera Consensus Service topic,
# and prompt for a message sent to the topic. This message will be posted on the Hedera Hashgraph mainnet,
# and can be found using a Hedera Hashgraph explorer Message can also be found using the Open Waters API on the
# Armada Platform.

from package import OpenWater
import random


def run():
    # Init an open water client without api key
    print("Creating Hedera Hashgraph account!")
    client = OpenWater()

    # The return client exports only one function "account.create"
    # You can change your account info on Armada Platform, set for anonymous for now
    username = 'anuser' + str(random.randint(0, 1000))
    email = 'anemail' + str(random.randint(0, 1000))
    account = client.account.create(username, email, 'name', 'a company')
    print("Created!")

    # Record api key for Open Waters
    private_key: str = account['privateKey']
    # Re-init an open water client with api key created from account
    client = OpenWater(private_key)

    data = client.account.my_account()
    HH_ID = data['hederaAccountId']

    print("This is your Hedera Hashgraph account ID: " + HH_ID)
    print("Use this to check your message on Hedera Hashgraph")
    print("This is your privateKey: " + private_key)
    print("You can insert this in script to send messages without creating new topics")

    print("Creating HCS Topic!")
    # Create Hedera Consensus Topic, known as Flows on Armada Platform
    flow = client.flow.create('anonTopic-' + str(random.randint(0, 1000)), "TRACK_TRACE")

    # Prompt for message to be sent to topic
    memo = input("What is the message you want to send? ")
    print("Got your message. Sending to HH...")
    client.data.push(flow['id'], memo, memo, False)


run()
