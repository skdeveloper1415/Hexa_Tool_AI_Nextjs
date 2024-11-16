export const CATEGORIES = [
   /*  { name: "Assignment", value: "Assignment", code: 1 },
    { name: "Assessment", value: "Assessment", code: 2 },
    /* { name: "Communication", value: "Communication", code: 3 },
    { name: "Community Tools", value: "Community Tools", code: 4 },
    { name: "Content Library", value: "Content Library", code: 5 },
    { name: "Email", value: "Email", code: 6 },
    { name: "Instructor Program", value: "Instructor Program", code: 7 },
    { name: "Planning", value: "Planning", code: 8 },
    { name: "Questions", value: "Questions", code: 9 },
    { name: "Student Feedback", value: "Student Feedback", code: 10 },
    { name: "Support", value: "Support", code: 11 } */
    { name: "Instructional Design", value: "Instructional Design", code: 12 },
    { name: "Classroom Resources", value: "Classroom Resources", code: 13 },
    { name: "Student Feedback", value: "Student Feedback", code: 14 },
    { name: "Quality Communication", value: "Quality Communication", code: 15 },
    { name: "Programs and Policies", value: " Programs and Policies", code: 16 },
    { name: "Collaborating with Colleagues", value: "Collaborating with Colleagues", code: 17 },
    { name: "Data Insights", value: "Data Insights", code: 18 },
    { name: "Family/Caregiver Engagement", value: "Family/Caregiver Engagement", code: 19 },
    { name: "Beyond the School Bell", value: "Beyond the School Bell", code: 20 },
    { name: "Just for Joy", value: "Just for Joy", code: 21 },
    /* { name: "Other", value: "Other", code: 22 } */
]

export const APPS = [
    {
        "category": "Instructional Design",
        "src": "/images/ai-iep.svg",
        "alt": "Brix Classroom Lesson Planning",
        "title": "Brix Classroom Lesson Planning",
        "description": "Lesson design trained by district educators to generate a range of plans from topic to units based on standards and selected criteria. ",
        "link": "/aiapps/classroomLessonPlanning"
    },
    {
        "category": "Student Feedback",
        "src": "/images/ai-student.svg",
        "alt": "Student Feedback",
        "title": "Student Feedback",
        "description": "Intention: Allowing students to understand their performance.",
        "link": "/aiapps/studentworkfeedback"
    },
    {
        "category": "Instructional Design",
        "src": "/images/ai-rubric.svg",
        "alt": "Rubric Design",
        "title": "Rubric Design",
        "description": "Employ AI to compose a rubric in table form for an assignment you're preparing for your class								",
        "link": "/aiapps/rubricGenerator"
    },
    {
        "category": "Instructional Design",
        "src": "/images/ai-multistep.svg",
        "alt": "Assignment Builder",
        "title": "Assignment Builder",
        "description": "Design a complete assignment centered around any topic, featuring a warm-up exercise, academic content, vocabulary study, and related questions..",
        "link": "/aiapps/multistepassignment"
    },

    {
        "category": "Classroom Resources",
        "src": "/images/ai-text.svg",
        "alt": "Text Analysis Tool",
        "title": "Text Analysis Tool",
        "description": "Produce a text analysis task comprising a writing prompt and accompanying text-dependent questions",
        "link": "/aiapps/textAnalysisAssignment"
    },
    
    {
        "category": "Classroom Resources",
        "src": "/images/ai-multichoice.svg",
        "alt": "Quiz Creator",
        "title": "Quiz Creator",
        "description": "Allows to create Assessment based on criteria opted in the form of MCQ",
        "link": "/aiapps/quizCreator"
    },
    {
        "category": "Quality Communication",
        "src": "/images/satreadcust.svg",
        "alt": "Blog Creator",
        "title": "Blog Creator",
        "description": "Blog creator creates blog postings to inform and educate teachers, families and students.",
        "link": "/aiapps/realworldconnections"
    },

    {
        "category": "Classroom Resources",
        "src": "/images/vocabularylist.svg",
        "alt": "Vocabulary List Creator",
        "title": "Vocabulary List Creator",
        "description": "Create a list of essential vocabulary words from a subject, topic, or text that are crucial for student learning.",
        "link": "/aiapps/vocabularylistgenerator"
    },
    {
        "category": "Support",
        "src": "/images/textproofreader.svg",
        "alt": "Proofreading Assistant",
        "title": "Proofreading Assistant",
        "description": "Take any text and have it proofread, correcting grammar, spelling, punctuation and adding clarity.",
        "link": "/aiapps/textproofreader"
    },
    {
        "category": "Support",
        "src": "/images/ai-confusion.svg",
        "alt": "Misconception Identifier",
        "title": "Misconception Identifier",
        "description": "Identify the most common misconceptions on any topic and explore strategies to address them effectively",
        "link": "/aiapps/commonmisconceptions"
    },
    {
        "category": "Content Library",
        "src": "/images/3DScienceAssesment.svg",
        "alt": "DBQ (Document Based-Questioning)",
        "title": "DBQ (Document Based-Questioning)",
        "description": "Analyze the content to generate relevant document based questions.",
        "link": "/aiapps/textdependentquestions"
    },





    {
        "category": "Planning",
        "src": "/images/ai-lesson.svg",
        "alt": "Lesson Plan",
        "title": "Lesson Plan",
        "description": "Generate a lesson plan for a topic or objective you`re teaching.",
        "link": "/aiapps/lessonPlan"
    },
    {
        "category": "Planning",
        "src": "/images/5E ModelLessonPlan.svg",
        "alt": "5E Model Lesson Plan",
        "title": "5E Model Lesson Plan",
        "description": "Generate 5E Model Lesson Plan for your science class. Engage, Explore, Explain, Elaborate , Evaluate.",
        "link": "/aiapps/5emodellessonplan"
    },
    {
        "category": "Planning",
        "src": "/images/ai-unitplan.svg",
        "alt": "Unit Plan Generator",
        "title": "Unit Plan Generator",
        "description": "Generate a draft of a unit plan based on topic, standards and obkectives, and length of unit.",
        "link": "/aiapps/unitPlanGenerator"
    },

    // {
    //     "category": "Content Library",
    //     "src": "/images/ai-rubric.svg",
    //     "alt": "Rubric Generator",
    //     "title": "Rubric Generator",
    //     "description": "Have AI write a rubric for an assignment you are creating for your class in a table format.",
    //     "link": "/aiapps/rubricGenerator"
    // },
    // {
    //     "category": "Assignment",
    //     "src": "/images/ai-multistep.svg",
    //     "alt": "Multi-Step Assignment",
    //     "title": "Multi-Step Assignment",
    //     "description": "Generate a full assignment based or any topic, including a warmup, academic content,...",
    //     "link": "/aiapps/multistepassignment"
    // },
    {
        "category": "Assignment",
        "src": "/images/ai-resistant.svg",
        "alt": "AI-Resistant Assignments",
        "title": "AI-Resistant Assignments",
        "description": "Receive suggestions on making assignments more challenging for AI chatbots.",
        "link": "/aiapps/resistantAssignments"
    },
    // {
    //     "category": "Assignment",
    //     "src": "/images/ai-text.svg",
    //     "alt": "Text Analysis Assignment",
    //     "title": "Text Analysis Assignment",
    //     "description": "Generate a text based analysis assignment that includes a writing prompt along with text...",
    //     "link": "/aiapps/textAnalysisAssignment"
    // },

    {
        "category": "Assessment",
        "src": "/images/ai-multichoice.svg",
        "alt": "Multiple Choice Assessments",
        "title": "Multiple Choice Assessments",
        "description": "Create a multiple choice assessment based on any topic, standard(s), or criteria!",
        "link": "/aiapps/multiChoiceAssesment"
    },

    {
        "category": "Content Library",
        "src": "/images/ai-mathspiral.svg",
        "alt": "Math Spiral Review",
        "title": "Math Spiral Review",
        "description": "Generate a spiral review problem set for any math standards or topics.",
        "link": "/aiapps/mathSpiralReview"
    },

    {
        "category": "Content Library",
        "src": "/images/ai-mathstory.svg",
        "alt": "Math Story Word Problems",
        "title": "Math Story Word Problems",
        "description": "Write a custom math word / story problem based on the concept you’re teaching and a story topic.",
        "link": "/aiapps/mathstorywordproblems"
    },
    {
        "category": "Content Library",
        "src": "/images/ai-academic.svg",
        "alt": "Academic Content",
        "title": "Academic Content",
        "description": "Generate original academic content customized to the criteria of your choice.",
        "link": "/aiapps/academiccontent"
    },

    {
        "category": "Questions",
        "src": "/images/ai-dok.svg",
        "alt": "DOK Questions",
        "title": "DOK Questions",
        "description": "Generate questions based on topic or standard for each of the 4 Depth of Knowledge (DOK) levels.",
        "link": "/aiapps/dokQuestion"
    },

    {
        "category": "Assignment",
        "src": "/images/3DScienceAssesment.svg",
        "alt": "Three Dimensional (3D) Science Assessments",
        "title": "Three Dimensional (3D) Science Assessments",
        "description": "Write a three dimensional science assessment using NGSS standards.",
        "link": "/aiapps/threeDimAssessment"
    },
    {
        "category": "",
        "src": "/images/autoGrading.svg",
        "alt": "Auto Grading",
        "title": "Auto Grading",
        "description": "Based on the custom criteria, AI give grading for the student responses",
        "link": "/aiapps/autograding"
    },
    // {
    //     "category": "",
    //     "src": "/images/instantFeedback.svg",
    //     "alt": "Student Feedback Tool",
    //     "title": "Student Feedback Tool",
    //     "description": "Allows the work and suggests the ares to improve/ know the strong areas",
    //     "link": "/aiapps/instantfeedback"
    // },
    // // {
    //     "category": "Student Feedback",
    //     "src": "/images/ai-student.svg",
    //     "alt": "Student Work Feedback",
    //     "title": "Student Work Feedback",
    //     "description": "Based on a custom criteria, have AI give areas of strength & areas for growth on student work.",
    //     "link": "/aiapps/studentworkfeedback"
    // },
    {
        "category": "",
        "src": "/images/reportCardcomment.svg",
        "alt": "Gradebook Generator",
        "title": "Gradebook Generator",
        "description": "Generate Report Card Comments with a student`s strengths and areas for growth.",
        "link": "/aiapps/reportcardcomments"
    },
    {
        "category": "",
        "src": "/images/conceptualUnderstanding.svg",
        "alt": "Conceptual Understanding",
        "title": "Conceptual Understanding",
        "description": "Generate ideas about how to help your students build conceptual understanding.",
        "link": "/aiapps/conceptualunderstanding"
    },
    {
        "category": "",
        "src": "/images/clearDirection.svg",
        "alt": "Clear Directions",
        "title": "Clear Directions",
        "description": "Make your directions more concise and sequential so they`re easier to understand for your students.",
        "link": "/aiapps/cleardirections"
    },
    {
        "category": "",
        "src": "/images/makeitRelevent.svg",
        "alt": "Relevance Enhancer",
        "title": "Relevance Enhancer",
        "description": "Generate several ideas that make what you’re teaching relevant to your class based on their interests and background.",
        "link": "/aiapps/makerelevant"
    },
    {
        "category": "Planning",
        "src": "/images/projectBasedLearning.svg",
        "alt": "Project-Based Learning Planner",
        "title": "Project-Based Learning Planner",
        "description": "Develops learning plan based on the project rules and principles.",
        "link": "/aiapps/projectBasedLearning"
    },
    {
        "category": "",
        "src": "/images/sciencelab.svg",
        "alt": "Science Activity Creator",
        "title": "Science Activity Creator",
        "description": "Generates engaging science labs on topics.",
        "link": "/aiapps/sciencelabs"
    },
    {
        "category": "",
        "src": "/images/realWorldconnection.svg",
        "alt": "Real-World Applications",
        "title": "Real-World Applications",
        "description": "Generates real time world examples and incidents for better engagement of students.",
        "link": "/aiapps/realworldconnections"
    },
    {
        "category": "",
        "src": "/images/socialStories.svg",
        "alt": "Social Story Creator",
        "title": "Social Story Creator",
        "description": "This is an experience based learning style, generates a story to understand and to meet expectations by the student.",
        "link": "/aiapps/socialstories"
    },
    {
        "category": "",
        "src": "/images/exandnonex.svg",
        "alt": "Example and Non-Example Tool",
        "title": "Example and Non-Example Tool",
        "description": "Generates  Exemplar & Non Exemplar responses for the given topics.",
        "link": "/aiapps/exampleandnonexample"
    },
    {
        "category": "",
        "src": "/images/teacherjokes.svg",
        "alt": "Teacher Humor Tool",
        "title": "Teacher Humor Tool",
        "description": "Generate teacher jokes for your class to be the coolest teacher out there!",
        "link": "/aiapps/teacherjokes"
    },
    {
        "category": "",
        "src": "/images/satreadpract.svg",
        "alt": "SAT Reading Practice Tool",
        "title": "SAT Reading Practice Tool",
        "description": "Generate practice SAT Reading Practice Tool that has passages and associated questions..",
        "link": "/aiapps/satreadingpracticetest"
    },
    {
        "category": "",
        "src": "/images/satreadcust.svg",
        "alt": "SAT Reading Questions Generator",
        "title": "SAT Reading Questions Generator",
        "description": "Generate practice questions in the style of the SAT reading section based on any text of your choice.",
        "link": "/aiapps/satreadingquestions"
    },

    // {
    //     "category": "Content Library",
    //     "src": "/images/textdepque.svg",
    //     "alt": "Text Dependent Questions",
    //     "title": "Text Dependent Questions",
    //     "description": "Generate text dependent questions for students based on any text that you input.",
    //     "link": "/aiapps/textdependentquestions"
    // },

    {
        "category": "",
        "src": "/images/syllabusgenerator.svg",
        "alt": "Syllabus Creator",
        "title": "Syllabus Creator",
        "description": "Allows to generate syllabus for desired grade for that year.",
        "link": "/aiapps/syllabusgenerator"
    },

    {
        "category": "",
        "src": "/images/sentencestarter.svg",
        "alt": "Sentence Initiator Tool",
        "title": "Sentence Initiator Tool",
        "description": "Provide sentence starters for any topic, assignment standard,or objective.",
        "link": "/aiapps/sentencestarters"
    },
    // {
    //     "category": "Support",
    //     "src": "/images/vocabularylist.svg",
    //     "alt": "Vocabulary List Generator",
    //     "title": "Vocabulary List Generator",
    //     "description": "Generate a list of vocabulary words based on a subject,topic, or text that are important for students to learn.",
    //     "link": "/aiapps/vocabularylistgenerator"
    // },
    {
        "category": "",
        "src": "/images/vocbasedtext.svg",
        "alt": "Vocabulary-Enhanced Texts",
        "title": "Vocabulary-Enhanced Texts",
        "description": "A customized vocabulory can be defined to generate texts accordingly to learn and practice.",
        "link": "/aiapps/vocabularybasedtext"
    },
    {
        "category": "",
        "src": "/images/decodabletext.svg",
        "alt": "Decodable Text Creator",
        "title": "Decodable Text Creator",
        "description": "Create a decodable text grounded in the principles of the Science of Reading to aid early literacy development.",
        "link": "/aiapps/decodabletext"
    },
    {
        "category": "",
        "src": "/images/textsummerizer.svg",
        "alt": "Summary Tool",
        "title": "Summary Tool",
        "description": "Allows to give a brief( summary ) in desired length for the given content or text.",
        "link": "/aiapps/textsummarizer"
    },
    // {
    //     "category": "",
    //     "src": "/images/textproofreader.svg",
    //     "alt": "Text Proofreader",
    //     "title": "Text Proofreader",
    //     "description": "Take any text and have it proofread, correcting grammar, spelling, punctuation and adding clarity.",
    //     "link": "/aiapps/textproofreader"
    // },
    {
        "category": "Support",
        "src": "/images/textLeveler.svg",
        "alt": "Text Difficulty Leveler",
        "title": "Text Difficulty Leveler",
        "description": "Allows the content modification basing the grade (level) or skill of the individual.",
        "link": "/aiapps/textleveler"
    },
    {
        "category": "",
        "src": "/images/groupworkGenerator.svg",
        "alt": "Group Work Organizer",
        "title": "Group Work Organizer",
        "description": "Allows the content modification basing the grade (level) or skill of the individual.",
        "link": "/aiapps/groupworkgenerator"
    },
    {
        "category": "",
        "src": "/images/teamBuilder.svg",
        "alt": "Team Building Guide",
        "title": "Team Building Guide",
        "description": "Allows to make interactions in personal or virtual meetings, to cope up in groups & as a team.",
        "link": "/aiapps/teambuilder"
    },
    {
        "category": "",
        "src": "/images/datatableAnalysis.svg",
        "alt": "Data Analysis Table",
        "title": "Data Analysis Table",
        "description": "Generates tables for analysis of data of individual choice.",
        "link": "/aiapps/datatableanalysis"
    },
    {
        "category": "Assignment",
        "src": "/images/assignmentScaffolder.svg",
        "alt": "Assignment Scaffolding Tool",
        "title": "Assignment Scaffolding Tool",
        "description": "Allows extra support to the students who are lagging behind ",
        "link": "/aiapps/assignmentscffolder"
    },
    {
        "category": "",
        "src": "/images/plagarismDetection.svg",
        "alt": "Plagiarism Detector",
        "title": "Plagiarism Detector",
        "description": "Identify the plagiarism in any content.",
        "link": "/aiapps/plagiarism"
    },

    {
        "category": "",
        "src": "/images/ai-teacherobservations.svg",
        "alt": "Teacher Observation Tool",
        "title": "Teacher Observation Tool",
        "description": "Allows to give feedback to students to improve on key areas by teacher.",
        "link": "/aiapps/teacherobservation"
    },


    {
        "category": "Planning",
        "src": "/images/ai-iep.svg",
        "alt": "IEP Planner",
        "title": "IEP Planner",
        "description": "Generate a draft of an individualised education program (IEP) customized to a student`s needs.",
        "link": "/aiapps/IEPGenerator"
    },
    {
        "category": "",
        "src": "/images/ai-multipleexplanations.svg",
        "alt": "Multiple Explanation Generator",
        "title": "Multiple Explanation Generator",
        "description": "Generates much clearer explinations in different ways for better understding by students.",
        "link": "/aiapps/multipleexplanations"
    },
    {
        "category": "",
        "src": "/images/ai-quoteoftheday.svg",
        "alt": "Daily Quotes",
        "title": "Daily Quotes",
        "description": "Generate quote of the day suggestions based on any topic.",
        "link": "/aiapps/quoteoftheday"
    },
    {
        "category": "Planning",
        "src": "/images/ai-standardunpacker.svg",
        "alt": "Standards Breakdown Tool",
        "title": "Standards Breakdown Tool",
        "description": "Generates engaging science labs on topics.",
        "link": "/aiapps/standardsUnpacker"
    },
    {
        "category": "",
        "src": "/images/ai-behaviorintervation.svg",
        "alt": "Behavior Intervention Planner",
        "title": "Behavior Intervention Planner",
        "description": "Generates suggestions plan basing on the behaviour inputs provided of the specific individual.",
        "link": "/aiapps/behaviorintervention"
    },
    {
        "category": "",
        "src": "/images/ai-coachsportpractice.svg",
        "alt": "Sports Practice Planner",
        "title": "Sports Practice Planner",
        "description": "Generate a plan for practice for any sport that you`re coaching!",
        "link": "/aiapps/coachSportsPractise"
    },
    {
        "category": "",
        "src": "/images/ai-restorative.svg",
        "alt": "Restorative Reflection Tool",
        "title": "Restorative Reflection Tool",
        "description": "Creates reflection assignments for students for disiplinary incidents, restorative practices..",
        "link": "/aiapps/restorativereflections"
    },
    {
        "category": "",
        "src": "/images/ai-songgenerator.svg",
        "alt": "Song Composer",
        "title": "Song Composer",
        "description": "Write a custom song about any topic to the tune of the song of your choice! ",
        "link": "/aiapps/songgenerator"
    },
    {
        "category": "",
        "src": "/images/ai-youtubesummarizer.svg",
        "alt": "YouTube Video Summary Tool",
        "title": "YouTube Video Summary Tool",
        "description": "Get a summary of YouTube video in whatever length you choose.",
        "link": "/aiapps/youtubesummarizer"
    },
    {
        "category": "",
        "src": "/images/ai-bipgenerator.svg",
        "alt": "Behavior Intervention Plan Creator",
        "title": "Behavior Intervention Plan Creator",
        "description": "Generate suggestions for a Behavior Intervention Plan Creator.",
        "link": "/aiapps/bipGenerator"
    },
    {
        "category": "",
        "src": "/images/ai-customchat.svg",
        "alt": "Interactive Chatbot",
        "title": "Interactive Chatbot",
        "description": "Create a Interactive Chatbot to interact with based on any criteria that ou choose!",
        "link": "/aiapps/customChat"
    },
    {
        "category": "Support",
        "src": "/images/ai-choiceboard.svg",
        "alt": "Choice Board Designer",
        "title": "Choice Board Designer",
        "description": "Offers learning sytles and choices to diversify needs of students. ",
        "link": "/aiapps/choiceboard"
    },
    // {
    //     "category": "",
    //     "src": "/images/ai-confusion.svg",
    //     "alt": "Common Misconceptions",
    //     "title": "Common Misconceptions",
    //     "description": "Generate the most common misconceptions and hoe to address them on any topic.",
    //     "link": "/aiapps/commonmisconceptions"
    // },
    {
        "category": "",
        "src": "/images/ai-letter.svg",
        "alt": "Recommendation Letter Writer",
        "title": "Recommendation Letter Writer",
        "description": "Allows to generate a  letter of recomention for students to study or work in other places.",
        "link": "/aiapps/letterofrecommendation"
    },
    {
        "category": "Email",
        "src": "/images/ai-emailresponder.svg",
        "alt": "Email Response Assistant",
        "title": "Email Response Assistant",
        "description": "Generate a customized professional e-mail communication in response to an email that you received",
        "link": "/aiapps/E-mailResponder"
    },
    {
        "category": "Email",
        "src": "/images/email.svg",
        "alt": "Family Email Composer",
        "title": "Family Email Composer",
        "description": "This app allows the Teachers to generate a custom email for Family",
        "link": "/aiapps/E-mailFamily"
    },
    {
        "category": "Email",
        "src": "/images/contact-mail 1.svg",
        "alt": "Professional Email Composer",
        "title": "Professional Email Composer",
        "description": "Generate a professional e-mail communication to colleagues and other professionals.",
        "link": "/aiapps/professionalEmail"
    },
    {
        "category": "",
        "src": "/images/ai-emailresponder.svg",
        "alt": "AI Presentation Maker",
        "title": "AI Presentation Maker",
        "description": "Based on a custom criteria, have AI give areas of strength & areas for growth on student work.",
        "link": "/aiapps/aipresentation"
    },
    {
        "category": "",
        "src": "/images/SEL Obs.svg",
        "alt": "SEL Observations",
        "title": "SEL Observations",
        "description": "Generate a social Emotional Learning lession plan for students in any grade level.",
        "link": "/aiapps/selobservation"
    },

    {
        "category": "",
        "src": "/images/rating.svg",
        "alt": "Jeopardy Review Game",
        "title": "Jeopardy Review Game",
        "description": " Create a jeopardy review game for a fun way to review content with student!",
        "link": "/aiapps/jeopardyreviewgame"
    },
   

]