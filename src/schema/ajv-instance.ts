import Ajv, {JSONSchemaType} from "ajv"
import addFormats from "ajv-formats";
import * as like_schema from "./like_event.json"

export let ajv = new Ajv({allErrors:true})

addFormats(ajv)


//const dateTimeRegex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9]) (2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?$');

//ajv.addFormat("iso-time", dateTimeRegex)

interface InEvent<T> {
    publishedBy: string,
    eventTime: string,
    eventName: string,
    eventType: string,
    details: T
  }

  interface InteractionDetails{
    sourceId: string,
    targetId: string,
    targetType: string
} 

export interface InteractionEvent extends InEvent<InteractionDetails>{} 
  
 /*
 const InsteractionSchema: JSONSchemaType<InteractionEvent> = {
    type: "object",
    properties: {
        publishedBy: {type: "string"},
        eventTime: {type: "string", format: "date-time"},
        eventName: {type: "string"},
        eventType: {type: "string"},
         details: {type: "object", properties: {
            sourceId: {type: "string"},
            targetId: {type: "string"},
            targetType: {type: "string"}
        }, required: ["sourceId", "targetId", "targetType"]}
    },
    required: ["publishedBy","eventTime", "eventName","eventType","details"],
    additionalProperties: false
  }*/
  
  let validate = ajv.compile<InteractionEvent>(like_schema) // type of validate extends `(data: any) => data is Foo`

  //const data: any = {foos: 1}

  let jsonString = `{

    "publishedBy": "user-id",
  
    "eventTime": "2021-07-13T08:42:45.047Z",
  
    "eventName": "interaction",
  
    "eventType": "like/unlike",
  
    "details": {
  
        "sourceId": "user-id",
  
        "targetId": "post-id/comment-id",
  
        "targetType": "post/comment"
  
       }
  
  }`

  let data = JSON.parse(jsonString) as InteractionEvent;

  if (validate(data)) {
    // data is Foo here
    console.log(data.eventName)
  } else {
    console.log(validate.errors)
  }

  let validate2 = ajv.validate(like_schema, data as InteractionEvent)

  if (validate2) {
    // data is Foo here
    console.log(data.eventName)
  } else {
    console.log(validate.errors)
  }

  const validateNew = <T>(schema: object, data: T): T => {
    const isValid = ajv.validate(schema, data)
  
    if (!isValid) {
      const errorMessages = ajv.errorsText()
      throw new Error(`Validation Error. ${errorMessages}`)
    }
  
    return data
  }

  console.log(validateNew<InteractionEvent>(like_schema, data))

  enum CarType {
	Honda = "HONDA",
	Toyota = "TOYOTA",
	Subaru = "SUBARU",
	Hyundai = "HYUNDAI"
}


console.log(CarType)