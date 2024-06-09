/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/PYqFy8YKfga
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
//import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogBody, AlertDialogFooter } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { v4 as uuidv4 } from 'uuid';


export default function StoryCreator() {
  const characterInitialState = [
    {
        "name": "Dennis",
        "description": "friendly dragon"
    },
    {
        "name": "Jason",
        "description": "hungry giant"
    }]
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)
  const [characters, setCharacters] = useState(characterInitialState)
  const [newCharacter, setNewCharacter] = useState({ name: "", description: "" })
  const [stories, setStories] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [noOfWords, setNoOfWords] = useState(500)
  const [language, setLanguage] = useState('English')
  const [audience, setAudience] = useState('Children')
  const [adventure, setAdventure] = useState('')
  const [chatList, setChatList] = useState([])

  const resetData =() => {
    setStories([])
    setAudience('Children')
    setLanguage('English')
  }
  const addCharacter = () => {
    if (newCharacter.name || newCharacter.description) {
      setCharacters([...characters, newCharacter])
      setNewCharacter({ name: "", description: "" })
    }
  }
  const getStory = () => {
    let reqBodyData = {
      "user_id": "23456780",
      "chat_id": uuidv4(),
      "no_of_words": noOfWords,
      "language": language,
      "target_audience": audience,
      "character": characters,
      "adventure": adventure
  }
   return fetch('/api', {method: 'POST', body: JSON.stringify(reqBodyData)})
    .then(response => response.json())
    .catch(error => console.log('error', error))
  }

  const getStoryBasedonId = (chatId) => {
    let filterData = chatList.filter(data => data.chat_id = chatId)[0].stories.map(data => data.story)
    console.log('filter data', filterData)
    setStories(filterData)
    // return fetch(`/story?chat_id=${chatId}&story_id=${storyId}`)
    // .then(response => response.json())
    // .then(data => {
    //   console.log('sinlg story data', data)
    //   setStories([data?.chats?.story])
    //   console.log(data?.chats?.adventure)
    //   setAdventure(data?.chats?.adventure)
    //   //setChatList(data?.chats)
    // })
    // .catch(error => console.log('error', error))
  }

  const getChatList = () => {
    let user_id = 23456780
    let reqBodyData = {
      "user_id": "23456780",
      "chat_id": "dd16f615-7a21-4f47-809f-87188c38b1d1",
      "no_of_words": noOfWords,
      "language": language,
      "target_audience": audience,
      "character": characters,
      "adventure": adventure
  }
    return fetch(`/api?user_id=${user_id}`)
    .then(response => response.json())
    .then(data => {
      console.log('data', data.chats)
      setChatList(data?.chats)
      //setStories(data?.chats?.stories.map(data => data?.story))
    })
    .catch(error => console.log('error', error))
  }
  const deleteChat = (chat_id) => {
    let user_id = 23456780
    return fetch(`/api?user_id=${user_id}&chat_id=${chat_id}`, {method : 'DELETE'})
    .then(response => response.json())
    .then(data => {
      console.log('delete data', data)
      //setStories(data?.chats?.stories.map(data => data?.story))
    })
    .catch(error => console.log('error', error))
  }

  useEffect(() => {
    getChatList()
  }, [])

  const updateCharacter = (index, field, value) => {
    const updatedCharacters = [...characters]
    updatedCharacters[index][field] = value
    setCharacters(updatedCharacters)
  }
  const removeCharacter = (index) => {
    const updatedCharacters = [...characters]
    updatedCharacters.splice(index, 1)
    setCharacters(updatedCharacters)
  }
  const handleNewCharacterChange = (field, value) => {
    setNewCharacter({ ...newCharacter, [field]: value })
  }
  const handleGenerateStory = async () => {
    const adventure = document.getElementById("adventure").value;
    let data = await getStory()
    console.log(' story data', data)
    const mockStory = data?.story
    // const mockStory = `Once upon a time, there were ${characters
    //   .map((character) => character.name)
    //   .join(
    //     "and",
    //   )}, who embarked on an adventure ${adventure}. After many exciting twists and turns, they learned valuable lessons and lived happily ever after.`
    setStories([...stories, mockStory])
    getChatList()
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  const deleteStory = async(chat_id) => {
    await deleteChat(chat_id)
    getChatList();
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      {isSidebarOpen && (
        <aside className={`w-64 bg-white border-r ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <div className="flex flex-col h-full">
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? "border-gray-700" : ""}`}>
              <h2 className={`text-lg font-semibold ${isDarkMode ? "text-white" : ""}`}>Chat History 💬</h2>
              <PlusIcon className={`h-6 w-6 ${isDarkMode ? "text-white" : ""}`} />
            </div>
            <div className={`flex flex-col flex-grow p-4 space-y-2 overflow-auto ${isDarkMode ? "text-white" : ""}`}>
              <Button variant="outline" className="flex items-center justify-between" onClick={()=> resetData()}>
                <span>New Story ✨</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              {chatList.map(chatData => {
                 return (
                  <Button variant="ghost" className="flex items-center justify-between" onClick={()=>getStoryBasedonId(chatData.chat_id)}>
                    <span className="w-10/12 truncate">{chatData?.chat_id}</span>
                    <MessageCircleIcon className="h-4 w-4" />
                    <XIcon className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} onClick={() => deleteStory(chatData.chat_id)} />
                  </Button>
                )
                // return chatData.stories.map(data => {
                //   console.log('data1', data)
                //   return (
                //     <Button variant="ghost" className="flex items-center justify-between" onClick={()=>getStoryBasedonId(data.chat_id, data.story_id)}>
                //       <span>{data?.title}</span>
                //       <MessageCircleIcon className="h-4 w-4" />
                //       <XIcon className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} onClick={() => deleteStory(0)} />
                //     </Button>
                //   )
                // })
              })}
              {/* <Button variant="ghost" className="flex items-center justify-between">
                <span>Dennis, Jason, and kkkk 👥</span>
                <MessageCircleIcon className="h-4 w-4" />
                <XIcon className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} onClick={() => deleteStory(0)} />
              </Button>
              <Button variant="ghost" className="flex items-center justify-between">
                <span>Jack and Emma 👫</span>
                <FileTextIcon className="h-4 w-4" />
                <XIcon className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} onClick={() => deleteStory(1)} />
              </Button> */}
            </div>
            <div className={`flex items-center justify-between p-4 border-t ${isDarkMode ? "border-gray-700" : ""}`}>
              <SettingsIcon className={`h-6 w-6 ${isDarkMode ? "text-white" : ""}`} />
              <MoonIcon className={`h-6 w-6 ${isDarkMode ? "text-white" : ""}`} onClick={toggleDarkMode} />
              <MessageCircleQuestionIcon className={`h-6 w-6 ${isDarkMode ? "text-white" : ""}`} />
              <Button variant="secondary" onClick={() => setIsUpgradeDialogOpen(true)}>
                Upgrade 🚀
              </Button>
            </div>
          </div>
        </aside>
      )}
      <main className={`flex-grow p-8 ${isDarkMode ? "bg-gray-900" : ""}`}>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className={`text-4xl font-bold ${isDarkMode ? "text-white" : ""}`}>
              What adventure will you create next? 🎉
            </h1>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <MenuIcon className={`h-6 w-6 ${isDarkMode ? "text-white" : ""}`} />
              <span className="sr-only">{isSidebarOpen ? "Close" : "Open"} Sidebar</span>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Select onValueChange={(e)=> setNoOfWords(e)}>
              <SelectTrigger id="story-length" aria-label="Story length">
                <SelectValue placeholder="Short (500 words)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">Short (500 words) 📗</SelectItem>
                <SelectItem value="1000">Medium (1000 words) 📕</SelectItem>
                <SelectItem value="1500">Long (1500 words) 📘</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(e)=> setLanguage(e)}>
              <SelectTrigger id="language" aria-label="Language">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English 🇺🇸</SelectItem>
                <SelectItem value="Spanish">Spanish 🇪🇸</SelectItem>
                <SelectItem value="French">French 🇫🇷</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(e)=> setAudience(e)}>
              <SelectTrigger id="audience" aria-label="Audience">
                <SelectValue placeholder="Children" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Children">Children 👶</SelectItem>
                <SelectItem value="Teens">Teens 👦</SelectItem>
                <SelectItem value="Adults">Adults 👩</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="character-name" className={isDarkMode ? "text-white" : ""}>
                Character Name(s) 👤
              </Label>
              <div className="flex flex-col space-y-2">
                {characters.map((character, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="flex-1">
                      {character.name || `Character ${index + 1} Name`}
                    </Badge>
                    <Badge variant="outline" className="flex-1">
                      {character.description || `Character ${index + 1} Description`}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => removeCharacter(index)}>
                      <XIcon className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`} />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Input
                    id="new-character-name"
                    placeholder="Character Name"
                    value={newCharacter.name}
                    onChange={(e) => handleNewCharacterChange("name", e.target.value)}
                    className={isDarkMode ? "text-white" : ""}
                  />
                  <Input
                    id="new-character-description"
                    placeholder="Character Description"
                    value={newCharacter.description}
                    onChange={(e) => handleNewCharacterChange("description", e.target.value)}
                    className={isDarkMode ? "text-white" : ""}
                  />
                  <Button variant="outline" onClick={addCharacter}>
                    <PlusIcon className={`h-4 w-4 mr-2 ${isDarkMode ? "text-white" : ""}`} />
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adventure" className={isDarkMode ? "text-white" : ""}>
                Adventure 🎢
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="adventure"
                  placeholder="eating lots of yummy food"
                  className={isDarkMode ? "text-white" : ""}
                  onChange={e => setAdventure(e.target.value)}
                  value={adventure}
                />
                <Button variant="secondary" onClick={handleGenerateStory}>
                  <ArrowRightIcon className={`h-6 w-6 ${isDarkMode ? "text-white" : ""}`} />
                  <span className="ml-2">Generate Story</span>
                </Button>
              </div>
            </div>
          </div>
          {stories.length > 0 && (
            <div className="mt-6">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : ""}`}>Generated Stories:</h2>
              <Accordion type="single" collapsible className="w-full">
                {stories.map((story, index) => (
                  <AccordionItem key={index} value={`story-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                        <span>Story {index + 1}</span>
                        <XIcon
                          className={`h-4 w-4 ${isDarkMode ? "text-white" : ""}`}
                          onClick={() => deleteStory(index)}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className={isDarkMode ? "text-white" : ""}>{story}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </main>
      {/* <AlertDialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Upgrade for more stories!</AlertDialogTitle>
            <AlertDialogDescription>
              Unlock all features including longer stories, different voice actors, and more.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 overflow-y-auto max-h-[500px] ${
              isDarkMode ? "bg-gray-800" : ""
            }`}
          >
            <Card className="p-6">
              <CardHeader>
                <CardTitle className={isDarkMode ? "text-white" : ""}>What's included in the PRO plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className={`list-disc pl-4 ${isDarkMode ? "text-white" : ""}`}>
                  <li>30 short, medium, or long stories</li>
                  <li>Unlimited voice narrations</li>
                  <li>5 unique voice actors</li>
                  <li>Email priority support</li>
                  <li>Supported languages: English, Chinese, French, German, Italian, Japanese, Korean, Spanish</li>
                </ul>
                <div className="flex items-center justify-between">
                  <p className={`text-lg font-bold ${isDarkMode ? "text-white" : ""}`}>$9</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Billed Monthly</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className={isDarkMode ? "text-white" : ""}>What's included in the FREE plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className={`list-disc pl-4 ${isDarkMode ? "text-white" : ""}`}>
                  <li>2 short stories</li>
                  <li>Unlimited voice narrations</li>
                  <li>1 voice actor</li>
                  <li>Email support</li>
                  <li>Supported languages: English</li>
                </ul>
                <div className="flex items-center justify-between">
                  <p className={`text-lg font-bold ${isDarkMode ? "text-white" : ""}`}>$0</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Billed Monthly</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  )
}

function ArrowRightIcon(props) {``
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function MessageCircleQuestionIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}