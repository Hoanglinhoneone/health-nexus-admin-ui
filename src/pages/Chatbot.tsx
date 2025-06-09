import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  type: "user" | "bot"
  timestamp: Date
}

// Mock bot responses
const botResponses = {
  greeting: "Xin chào! Tôi là trợ lý ảo của hệ thống Healthcare. Tôi có thể giúp bạn:",
  symptoms: "Dựa trên triệu chứng bạn mô tả, tôi khuyên bạn nên đặt lịch hẹn với bác sỹ chuyên khoa phù hợp. Bạn có muốn tôi giúp đặt lịch không?",
  appointment: "Tôi có thể giúp bạn đặt lịch hẹn. Vui lòng cung cấp thông tin về ngày mong muốn và loại dịch vụ cần khám.",
  doctor: "Chúng tôi có đội ngũ bác sỹ chuyên nghiệp trong nhiều lĩnh vực. Bạn cần tư vấn về chuyên khoa nào?",
  emergency: "Nếu đây là trường hợp cấp cứu, vui lòng gọi ngay 115 hoặc đến phòng cấp cứu gần nhất. Sức khỏe của bạn là ưu tiên hàng đầu!",
  default: "Tôi hiểu câu hỏi của bạn. Để được hỗ trợ tốt nhất, tôi khuyên bạn nên liên hệ trực tiếp với đội ngũ y tế của chúng tôi."
}

const quickResponses = [
  "Đặt lịch hẹn",
  "Tìm bác sỹ",
  "Triệu chứng bệnh",
  "Giờ làm việc",
  "Dịch vụ y tế",
  "Liên hệ khẩn cấp"
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `${botResponses.greeting}
      
• Tư vấn về triệu chứng bệnh
• Đặt lịch hẹn với bác sỹ
• Thông tin về các dịch vụ y tế
• Hướng dẫn sử dụng hệ thống
• Liên hệ khẩn cấp

Bạn cần hỗ trợ gì hôm nay?`,
      type: "bot",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes("đặt lịch") || message.includes("hẹn")) {
      return botResponses.appointment
    } else if (message.includes("bác sỹ") || message.includes("doctor")) {
      return botResponses.doctor
    } else if (message.includes("triệu chứng") || message.includes("đau") || message.includes("bệnh")) {
      return botResponses.symptoms
    } else if (message.includes("cấp cứu") || message.includes("khẩn cấp") || message.includes("emergency")) {
      return botResponses.emergency
    } else if (message.includes("xin chào") || message.includes("hello") || message.includes("chào")) {
      return botResponses.greeting
    } else {
      return botResponses.default
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      type: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        type: "bot",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chatbot hỗ trợ</h1>
          <p className="text-muted-foreground">Trợ lý ảo hỗ trợ tư vấn và đặt lịch khám bệnh</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Healthcare Assistant
                <span className="text-sm font-normal text-green-600">• Online</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.type === "bot" && (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {message.type === "user" && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input */}
              <div className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(inputMessage)
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Nhập câu hỏi hoặc yêu cầu hỗ trợ..."
                    disabled={isTyping}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isTyping || !inputMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Responses & Info */}
        <div className="space-y-6">
          {/* Quick Responses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Câu hỏi nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickResponses.map((response) => (
                <Button
                  key={response}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleQuickResponse(response)}
                >
                  {response}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Help Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Giờ hoạt động:</p>
                <p className="text-muted-foreground">24/7 - Hỗ trợ tự động</p>
              </div>
              <div>
                <p className="font-medium">Hotline:</p>
                <p className="text-muted-foreground">1900 1234</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">support@healthcare.com</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Chatbot có thể cung cấp thông tin cơ bản. Để được tư vấn chính xác, 
                  vui lòng liên hệ trực tiếp với đội ngũ y tế.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}