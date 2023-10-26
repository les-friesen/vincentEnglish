// export const assignment1 = {
//     assignmentId : "0001",
//     title: "Simple Past vs. Past Perfect",
//     subtitle: "Talking about the past",
//     questions: [[ 'The wind (blow)', 'away the leaves that we (collect)', '.' ],
//     [ 'She (throw)', 'away the letter that she (write)', '.' ],
//     [ 'They (show)', 'me the pictures they (take)', 'during their holidays.'],
//     [ 'In the evening, the children (tell)', 'their father what they (see)', 'at the zoo.'],
//     [ 'The boy (be)', 'very sorry for what he (do)', '.' ],
//     [ 'William (live)', 'in Boston for six years before he (move)', 'to New York'],
//     [
//         'The blue car (cross)',
//         'the street after the lights (turn)',
//         'red.'
//       ],
//       [
//         'When James (try)',
//         'to ring us, we (leave / already)',
//         'the house.'
//       ],
//       [
//         'After Joanna (finish)',
//         'her presentation, we (ask)',
//         'our questions.'
//       ],
//       [
//         'On her first day at the driving school, we (be)',
//         'very nervous because we (drive / not)',
//         'a car before']
//     //   ],
//     //   [
//     //     "I can't believe I (get)",
//     //     'that apartment. I (submit)',
//     //     "my application last week, but I didn't think I had a chance of actually getting it. When I (show)",
//     //     'up to take a look around, there were at least twenty other people who (arrive)',
//     //     'before me. Most of them (fill, already)',
//     //     'out their applications and were already leaving. The landlord said I could still apply, so I did. I (try)',
//     //     "to fill out the form, but I couldn't answer half of the questions. They (want)",
//     //     "me to include references, but I didn't want to list my previous landlord because I (have)",
//     //     "some problems with him in the past and I knew he wouldn't recommend me. I (end)",
//     //     'up listing my father as a reference. It was total luck that he (decide)',
//     //     'to give me the apartment. It turns out that the landlord and my father (go)',
//     //     'to high school together. He decided that I could have the apartment before he (look)',
//     //     'at my credit report. I really lucked out!'
//     //   ]

// ],
//     correctAnswers: {
//         "1-1": ["blew"],
//         "1-2": ["had collected"],
//         "2-1": ["threw"],
//         "2-2": ["had written"],
//         "3-1": ["showed"],
//         "3-2": ["had taken"],
//         "4-1": ["told"],
//         "4-2": ["had seen"],
//         "5-1": ["was"],
//         "5-2": ["had done"],
//         "6-1": ["had lived"],
//         "6-2": ["moved"],
//         "7-1": ["crossed"],
//         "7-2": ["had turned"],
//         "8-1": ["tried"],
//         "8-2": ["had already left"],
//         "9-1": ["had finished"],
//         "9-2": ["asked"],
//         "10-1" : ["were"],
//         "10-2" : ["had not driven", "hadn't driven"]
//         // "11-1" : "got",
//         // "11-2" : "submitted",
//         // "11-3" : "showed",
//         // "11-4" : "had arrived",
//         // "11-5" : "had already filled",
//         // "11-6" : "tried",
//         // "11-7" : "wanted",
//         // "11-8" : "had had",
//         // "11-9" : "ended",
//         // "11-10" : "decided",
//         // "11-11" : "had gone",
//         // "11-12" : "had looked"
//     }
// }

export const assignment2 = {
    assignmentId : "0002",
    title: "Simple Past vs. Past Perfect",
    subtitle: "Talking about the past",
    questions: [  

    {   type: "fillInTheBlank",
        fragments: [ 'The wind (blow)', 'away the leaves that we (collect)', "." ],
        correctAnswers: [['blew'],['had collected']]},
     {
         type: "multipleChoice",
         question: "What is my favourite colour?",
         options: ["red", "green", "blue", "pink"],
         correctAnswers: "red"
   },
    // {   type: "fillInTheBlank",
    //     fragments: [ 'She (throw)', 'away the letter that she (write)', "."],
    //     correctAnswers: [['threw'], ['had written']]},
    {
        type: "multipleChoice",
        question: "Where do I want to move to?",
        options: ["Madeira", "Vancouver Island", "Hawaii", "Scotland"],
        correctAnswers: "Madeira"
    },
    {   type: "composeText",
        fragments: [ "What do you want to be when you grow up" ],
        correctAnswers: []
    },
    // {   type: "fillInTheBlank",
    //     fragments: [ 'They (show)', 'me the pictures they (take)', 'during their holidays.'],
    //     correctAnswers:  [['showed'], ["had taken"]]},
    // {   type: "fillInTheBlank",
    //     fragments: [ 'In the evening, the children (tell)', 'their father what they (see)', 'at the zoo.'],
    //     correctAnswers: [['told'],["had seen"]]},
    // {   type: "fillInTheBlank",
    //     fragments: [ 'The boy (be)', 'very sorry for what he (do)', '.' ],
    //     correctAnswers: [['was'], ['had done']]},
    // {   type: "fillInTheBlank",
    //     fragments: [ 'William (live)', 'in Boston for six years before he (move)', 'to New York.'],
    //     correctAnswers: [['had lived'], ['moved']]},
    // {   type: "fillInTheBlank",
    //     fragments: [ 'The blue car (cross)','the street after the lights (turn)','red.'],
    //     correctAnswers: [['crossed'], ['had turned']]},
    // {   type: "fillInTheBlank",
    //     fragments: [ 'When James (try)', 'to ring us, we (leave / already)','the house.'],
    //     correctAnswers: [['tried'], ['had already left']]},
    // {   type: "fillInTheBlank",
    //     fragments: ['After Joanna (finish)','her presentation, we (ask)','our questions.'],
    //     correctAnswers: [['had finished'], ['asked']]},
    {   type: "fillInTheBlank",
        fragments: ['On her first day at the driving school, we (be)','very nervous because we (drive / not)','a car before.'],
        correctAnswers: [['were'], ['had not driven', "hadn't driven"]]}
]
}

        // const questions = [

        //     {
        //         type: fitb,
        //         fragments: 3,
        //         correctAnswer: [one, two], 
        //     },

        //     { 
        //         type: multiplechoice,
        //         question: dfjksldf,
        //         choices: [a,b,c,d],
        //         correctAnswer: [a]
        //     }


        // ]





