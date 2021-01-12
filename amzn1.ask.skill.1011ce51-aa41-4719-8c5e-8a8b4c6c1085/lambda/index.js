/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = "Hola Laura!";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ReadLawIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadLaw';
    },
    handle(handlerInput) {
        
        const data_to_find = handlerInput.requestEnvelope.request.intent.slots.articulo.value;
        
        const data = {
            "articulos":[
                {
                    "numero":1,
                    "articulo": `Artículo 1. Objeto y ámbito de aplicación.
1. Esta ley establece los principios y las normas jurídicas generales del sistema tributario español y será de aplicación a todas las Administraciones tributarias en virtud y con el alcance que se deriva del artículo 149.1.1.ª, 8.ª, 14.ª y 18.ª de la Constitución.

Lo establecido en esta ley se entenderá sin perjuicio de lo dispuesto en las leyes que aprueban el Convenio y el Concierto Económico en vigor, respectivamente, en la Comunidad Foral de Navarra y en los Territorios Históricos del País Vasco.

2. Esta ley establece, asimismo, los principios y las normas jurídicas generales que regulan las actuaciones de la Administración tributaria por aplicación en España de la normativa sobre asistencia mutua entre los Estados miembros de la Unión Europea o en el marco de los convenios para evitar la doble imposición o de otros convenios internacionales.

A los efectos de esta ley, se entenderá por asistencia mutua el conjunto de acciones de asistencia, colaboración, cooperación y otras de naturaleza análoga que el Estado español preste, reciba o desarrolle con la Unión Europea y otras entidades internacionales o supranacionales, y con otros Estados en virtud de la normativa sobre asistencia mutua entre los Estados miembros de la Unión Europea o en el marco de los convenios para evitar la doble imposición o de otros convenios internacionales. La asistencia mutua podrá comprender la realización de actuaciones ante obligados tributarios.

La asistencia mutua a la que se refiere este apartado participa de la naturaleza jurídica de las relaciones internacionales a las que se refiere el artículo 149.1.3.ª de la Constitución.`
                }
                ,
                {
                
                "numero":4,
                "articulo": `Artículo 4. Potestad tributaria.\n
            
                1. La potestad originaria para establecer tributos corresponde exclusivamente al Estado, mediante ley.
            
                2. Las comunidades autónomas y las entidades locales podrán establecer y exigir tributos, de acuerdo con la Constitución y las leyes.
            
                3. Las demás entidades de derecho público podrán exigir tributos cuando una ley así lo determine.`
                    }
                
                
                ]
            
        }
        
        var speakOutput = `Lo siento no he encontrado el artículo ${data_to_find} `;
                // iterate over each element in the array
        for (var i = 0; i < data["articulos"].length; i++){
          // look for the entry with a matching `code` value
          if (data["articulos"][i].numero == data_to_find){
              speakOutput = data["articulos"][i].articulo;
          }
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Que tal';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedo ayudarte?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento no entiendo';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento no entiendo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        ReadLawIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();