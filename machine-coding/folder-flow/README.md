# Data struture for the folder-flow application

--there can be either a file or a folder at each level.
--if file - means no children 
-- if folder - means have children.

--sample data
[
    {
        id:1,
        type:file,
        name:'app.js'
    },
    {
        id:2,
        type:folder,
        name:'component'
        children:[
            {id:3,
            type:'folder',
            name:'header',
            children:[{
                id:4,
                type:'file',
                name:'header.js'
            },
            {
                id:5,
                type:'file',
                name:'header.css'
            }]
            },
            {
                id:6,
                type:'file',
                name:'button.js'
            }
        ]
    }
]
