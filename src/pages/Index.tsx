import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent } from "@/components/ui/card"
import { User, UserPlus, Calendar, MessageCircle, Activity, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Healthcare Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Hệ thống quản lý y tế tổng hợp</p>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Chào mừng đến với Healthcare Admin</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hệ thống quản lý y tế chuyên nghiệp giúp bạn quản lý bác sỹ, bệnh nhân, 
                lịch hẹn khám bệnh và hỗ trợ tư vấn tự động một cách hiệu quả.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">15</p>
                      <p className="text-sm text-muted-foreground">Bác sỹ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">248</p>
                      <p className="text-sm text-muted-foreground">Bệnh nhân</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-sm text-muted-foreground">Lịch hẹn hôm nay</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-muted-foreground">Hiệu suất</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/doctors">
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Quản lý bác sỹ</h3>
                    <p className="text-sm text-muted-foreground">
                      Thêm, sửa, xóa thông tin bác sỹ và quản lý lịch làm việc
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/patients">
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Quản lý bệnh nhân</h3>
                    <p className="text-sm text-muted-foreground">
                      Quản lý hồ sơ bệnh nhân, tiền sử bệnh và thông tin cá nhân
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/appointments">
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Đặt lịch hẹn</h3>
                    <p className="text-sm text-muted-foreground">
                      Quản lý lịch hẹn khám bệnh và theo dõi trạng thái
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/chatbot">
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Chatbot hỗ trợ</h3>
                    <p className="text-sm text-muted-foreground">
                      Trợ lý ảo tư vấn y tế và hỗ trợ đặt lịch hẹn tự động
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">BS. Nguyễn Văn A đã cập nhật lịch làm việc</p>
                      <p className="text-xs text-muted-foreground">2 phút trước</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Bệnh nhân Trần Thị B đã đặt lịch hẹn khám tim mạch</p>
                      <p className="text-xs text-muted-foreground">15 phút trước</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Chatbot đã hỗ trợ 12 cuộc hội thoại mới</p>
                      <p className="text-xs text-muted-foreground">1 giờ trước</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
