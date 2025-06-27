import React, { useState, useRef, useCallback } from 'react';
import { Volume2, Play, Pause, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSynthesizeSpeech } from '@/hooks/use-predicare-api';
import { createAudioUrl } from '@/lib/api-client';

const VoiceAssistant = () => {
  // Speech synthesis states
  const [textToSpeak, setTextToSpeak] = useState('');
  const [synthesizedAudioUrl, setSynthesizedAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // API hooks (transcription removed)
  const synthesizeSpeech = useSynthesizeSpeech();

  // Text-to-Speech
  const handleTextToSpeech = useCallback(async () => {
    if (textToSpeak.trim()) {
      try {
        const result = await synthesizeSpeech.mutateAsync(textToSpeak);
        if (result.success && result.audio_base64) {
          const audioUrl = createAudioUrl(result.audio_base64);
          setSynthesizedAudioUrl(audioUrl);
        }
      } catch (error) {
        console.error('Speech synthesis error:', error);
      }
    }
  }, [textToSpeak, synthesizeSpeech]);

  // Audio playback controls
  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlayingAudio(!isPlayingAudio);
    }
  }, [isPlayingAudio]);

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlayingAudio(false);
  }, []);

  return (
    <Card className="w-full shadow-lg border-purple-200">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-6 w-6" />
          Text-to-Speech Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert>
          <Volume2 className="h-4 w-4" />
          <AlertDescription>
            Convert your text into natural-sounding speech using AI. Perfect for accessibility and hands-free content consumption.
          </AlertDescription>
        </Alert>

        {/* Text to Speech Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Convert Text to Speech</h3>
          
          <Textarea
            placeholder="Enter text to convert to speech..."
            value={textToSpeak}
            onChange={(e) => setTextToSpeak(e.target.value)}
            className="min-h-24"
          />
          
          <Button 
            onClick={handleTextToSpeech}
            disabled={!textToSpeak.trim() || synthesizeSpeech.isPending}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {synthesizeSpeech.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Converting to Speech...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Convert to Speech
              </>
            )}
          </Button>
          
          {synthesizedAudioUrl && (
            <div className="bg-purple-50 p-4 rounded-lg space-y-3">
              <p className="text-sm font-medium text-purple-800">Generated Audio:</p>
              <div className="flex gap-2">
                <Button
                  onClick={handlePlayPause}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleStop}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </div>
              <audio
                ref={audioRef}
                src={synthesizedAudioUrl}
                onEnded={handleAudioEnded}
                className="hidden"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
