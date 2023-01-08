import { createClient } from "urql";
import { useEffect, useState } from "react";


const APIURL = 'https://api.thegraph.com/subgraphs/name/ostapbobrys/patsomarketplace'

const query = `
query {
    approvals {
      id
      owner
      approved
      tokenId
      blockNumber
      blockTimestamp
      transactionHash
    }
    approvalForAlls {
      id
      owner
      operator
      approved
      blockNumber
      blockTimestamp
      transactionHash
    }
    ownershipTransferreds {
      id
      previousOwner
      newOwner
      blockNumber
      blockTimestamp
      transactionHash
    }
    sales {
      id
      sender
      metadataURI
      timestamp
      blockNumber
      blockTimestamp
      transactionHash
    }
    transfers {
      id
      from
      to
      tokenId
      blockNumber
      blockTimestamp
      transactionHash
    }
} 
`

const client = createClient({
    url: APIURL
})

const fetchData = async () => {
    const response = await client.query(query).toPromise()
    console.log('Response: ', response)
 }



export {
    fetchData
}