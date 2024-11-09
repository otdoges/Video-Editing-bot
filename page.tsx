'use client'

import * as React from 'react'
import type { ChangeEvent } from 'react'
import { Player, PlayerRef } from '@remotion/player'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Play,
  SkipForward,
  SkipBack,
  Download,
  Sun,
  Moon,
  Trash2
} from 'lucide-react'

interface MediaFile extends File {
  preview?: string;
}

const DummyComposition: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <h1 className="text-white">Video Preview</h1>
    </div>
  )
}

export default function VideoEditor() {
  const [media, setMedia] = React.useState<MediaFile[]>([])
  const [nlpPrompt, setNlpPrompt] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedVideoUrl, setEditedVideoUrl] = React.useState('')
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const playerRef = React.useRef<PlayerRef>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
    }

    return () => {
      media.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [media]) // Added media to dependency array

  React.useEffect(() => {
    const htmlElement = document.documentElement
    if (isDarkMode) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const files = Array.from(event.target.files).map((file) => {
      const mediaFile = file as MediaFile
      mediaFile.preview = URL.createObjectURL(file)
      return mediaFile
    })

    setMedia((prevMedia) => [...prevMedia, ...files])
    event.target.value = ''
  }

  const handleRemoveMedia = (index: number) => {
    setMedia((prevMedia) => {
      const newMedia = [...prevMedia]
      const removedFile = newMedia[index]
      if (removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview)
      }
      newMedia.splice(index, 1)
      return newMedia
    })
  }

  const handleNlpEdit = async () => {
    setIsEditing(true)
    setProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 500)

      await new Promise(resolve => setTimeout(resolve, 5000))
      
      clearInterval(progressInterval)
      setProgress(100)
      setEditedVideoUrl('https://example.com/edited-video.mp4')
    } catch (error) {
      console.error('Error during editing:', error)
    } finally {
      setIsEditing(false)
    }
  }

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (playerRef.current.isPlaying()) {
        playerRef.current.pause()
      } else {
        playerRef.current.play()
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI Video Editor</CardTitle>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                id="dark-mode"
                aria-label="Toggle dark mode"
              />
              <Moon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg overflow-hidden border">
              <Player
                ref={playerRef}
                component={DummyComposition}
                durationInFrames={300}
                compositionWidth={640}
                compositionHeight={360}
                fps={30}
                controls
                style={{
                  width: '100%',
                }}
              />
            </div>

            <div className="grid gap-6">
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="outline"
                >
                  <Upload className="mr-2 h-4 w-4" /> Import Media
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="video/*,image/*"
                  className="hidden"
                />
                <Button variant="outline" onClick={handlePlayPause}>
                  <Play className="mr-2 h-4 w-4" /> Play
                </Button>
                <Button variant="outline">
                  <SkipBack className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button variant="outline">
                  <SkipForward className="mr-2 h-4 w-4" /> Next
                </Button>
              </div>

              <div>
                <Label htmlFor="timeline" className="text-sm font-medium mb-2 block">
                  Timeline
                </Label>
                <Slider
                  id="timeline"
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    if (playerRef.current) {
                      playerRef.current.seekTo(value[0])
                    }
                  }}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Media Files</h3>
                <div className="grid gap-2">
                  {media.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg border bg-card"
                    >
                      <span className="truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMedia(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="nlp-prompt" className="text-lg font-semibold mb-2 block">
                  NLP Editing
                </Label>
                <div className="space-y-2">
                  <Input
                    id="nlp-prompt"
                    value={nlpPrompt}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNlpPrompt(e.target.value)}
                    placeholder="Describe your editing request..."
                    disabled={isEditing}
                  />
                  {isEditing && (
                    <Progress value={progress} className="w-full h-2" />
                  )}
                  <Button 
                    onClick={handleNlpEdit} 
                    disabled={isEditing || media.length === 0 || !nlpPrompt}
                    className="w-full"
                  >
                    {isEditing ? 'Processing...' : 'Edit with AI'}
                  </Button>
                </div>
              </div>

              {editedVideoUrl && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Edited Video</h3>
                  <Button asChild className="w-full" variant="secondary">
                    <a href={editedVideoUrl} download>
                      <Download className="mr-2 h-4 w-4" /> Download Edited Video
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}