Object subclass: WisdomGenerator [

    "Method to return a random wisdom challenge"
    WisdomGenerator class >> getDailyChallenge [
        | wisdomBank selectedItem quote question choices correctChoice shuffledChoices choicesString |

        "Define a list of wisdom quotes, paired with trivia questions"
        wisdomBank := #(
            ( '“The unexamined life is not worth living.” – Socrates' 
              'Who said this famous quote?' 
              'Socrates' ('Plato' 'Aristotle' 'Descartes') )

            ( '“Do what you can, with what you have, where you are.” – Theodore Roosevelt' 
              'Who was Theodore Roosevelt?' 
              '26th President of the United States' ('Founder of the United Nations' 'Civil War General' 'Author of "The Prince"') )

            ( '“An investment in knowledge pays the best interest.” – Benjamin Franklin' 
              'What did Benjamin Franklin establish in 1743?' 
              'The American Philosophical Society' ('The Federal Reserve' 'The U.S. Constitution' 'The New York Stock Exchange') )
        ).

        "Pick a random wisdom challenge"
        selectedItem := wisdomBank at: (1 to: wisdomBank size) atRandom.

        "Extract quote, question, correct answer, and wrong choices"
        quote := selectedItem at: 1.
        question := selectedItem at: 2.
        correctChoice := selectedItem at: 3.
        choices := (selectedItem at: 4) copyWith: correctChoice.

        "Shuffle the choices randomly"
        shuffledChoices := choices sort: [ :a :b | (1 to: 2) atRandom = 1 ].

        "Convert choices array to string manually"
        choicesString := String streamContents: [:stream |
            shuffledChoices do: [:choice | 
                stream nextPutAll: choice.
                stream nextPutAll: ', '.
            ].
        ].

        "Format the challenge as a JSON string"
        ^ '{ "quote": "', quote, '", "question": "', question, '", "choices": "', choicesString, '", "answer": "', correctChoice, '" }'.
    ]
]

"Print the selected challenge as JSON"
Transcript show: (WisdomGenerator getDailyChallenge); cr.
