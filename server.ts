import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", appName: "Nối cơ hội - Đổi cuộc đời" });
});

// AI CV Advice and Tailoring endpoint
app.post("/api/ai/cv-advice", async (req, res) => {
  const { major, targetRole, skills, experienceLevel, userDraft } = req.body;

  const prompt = `Bạn là chuyên gia tư vấn tuyển dụng và hướng nghiệp hàng đầu tại Việt Nam, đặc biệt hỗ trợ sinh viên mới ra trường và người chưa có kinh nghiệm ("Nối cơ hội - Đổi cuộc đời").
Hãy đưa ra lời khuyên cụ thể, thực tế và dễ áp dụng cho ứng viên sau:
- Khối ngành: ${major || "Không xác định"}
- Vị trí mong muốn: ${targetRole || "Chưa xác định"}
- Kỹ năng hiện có: ${skills || "Chưa liệt kê"}
- Trình độ kinh nghiệm: ${experienceLevel || "Mới tốt nghiệp / Chưa có kinh nghiệm"}
- Nội dung bản nháp (nếu có): ${userDraft || "Chưa có"}

Nhiệm vụ của bạn:
1. Gợi ý 4-5 nội dung cốt lõi bắt buộc phải có trong CV người chưa có kinh nghiệm để gây ấn tượng với nhà tuyển dụng (cách biến đồ án, bài tập lớn, hoạt động Đoàn - Hội thành kinh nghiệm thực chiến).
2. Hướng dẫn cách tạo trang web Portfolio trên Google Sites (tại sao Google Sites lại miễn phí, nhanh chóng và chứng minh năng lực thật).
3. Viết mẫu 1 đoạn "Mục tiêu nghề nghiệp" (Career Objective) ngắn gọn, truyền cảm hứng và thể hiện tinh thần sẵn sàng học hỏi.
4. Cảnh báo 2 dấu hiệu lừa đảo tuyển dụng phổ biến ứng viên vị trí này cần tránh (như nộp tiền đặt cọc, làm nhiệm vụ online mờ ám).

Hãy trả lời bằng tiếng Việt, giọng văn ấm áp, khích lệ, gạch đầu dòng rõ ràng, súc tích và thiết thực.`;

  const ai = getGeminiClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });
      return res.json({ advice: response.text, source: "gemini" });
    } catch (error: any) {
      console.error("Gemini API error, using curated advice fallback:", error?.message);
    }
  }

  // Curated professional fallback if key is not provided or network issue
  const fallbackAdvice = `### 🌟 Lời khuyên tối ưu CV cho bạn: ${targetRole || "Ứng viên mới"} (${major || "Tất cả ngành nghề"})

1. **Cách biến "Chưa có kinh nghiệm" thành điểm mạnh:**
   - **Đồ án môn học & Luận văn:** Đặt tên dự án rõ ràng, ghi rõ bạn phụ trách phần việc nào, công cụ đã dùng và kết quả đạt được (ví dụ: đạt điểm A, hoàn thành đúng hạn).
   - **Hoạt động ngoại khóa & Câu lạc bộ:** Nêu bật kỹ năng mềm (làm việc nhóm, giao tiếp, xử lý tình huống, quản lý thời gian).
   - **Thái độ học hỏi & Sự cầu tiến:** Nhà tuyển dụng đánh giá cao tính trung thực, kỷ luật và tinh thần chủ động hơn là việc cố tình bịa kinh nghiệm.

2. **Cách tận dụng Google Sites để tạo Portfolio số ấn tượng:**
   - Truy cập **sites.google.com** hoàn toàn miễn phí.
   - Chọn template "Portfolio" hoặc tạo trang trắng: thêm mục Giới thiệu bản thân, Sản phẩm/Dự án đã làm (hình ảnh, slide, tài liệu hoặc video minh họa).
   - Đính kèm link Google Sites rút gọn vào đầu CV để nhà tuyển dụng xem ngay chứng minh năng lực thực tế.

3. **Mẫu đoạn Mục tiêu nghề nghiệp (Career Objective) gợi ý:**
   *"Là cử nhân tốt nghiệp chuyên ngành ${major || "phù hợp"} với tinh thần trách nhiệm cao và khả năng tiếp thu nhanh, mục tiêu của tôi là ứng tuyển vào vị trí ${targetRole || "nhân viên / thực tập sinh"} tại quý công ty. Tôi mong muốn đem nhiệt huyết, kiến thức nền tảng và kỹ năng giải quyết vấn đề để đóng góp vào sự phát triển chung, đồng thời không ngừng rèn luyện kỹ năng thực tiễn từ các anh chị đi trước."*

4. **🛡️ Lưu ý an toàn - Tránh bẫy tuyển dụng:**
   - Tuyệt đối **KHÔNG** đóng bất kỳ khoản tiền nào (tiền đồng phục, tiền giữ chỗ, phí tài liệu, tiền cọc). Doanh nghiệp chân chính không bao giờ thu tiền của ứng viên.
   - Tránh xa các công việc yêu cầu "tải app làm nhiệm vụ", "nạp tiền để nhận hoa hồng" hoặc phỏng vấn tại các địa điểm mờ ám.`;

  return res.json({ advice: fallbackAdvice, source: "curated" });
});

// AI Interview simulation endpoint
app.post("/api/ai/interview-prep", async (req, res) => {
  const { roleName, industry } = req.body;
  const prompt = `Gợi ý 3 câu hỏi phỏng vấn thường gặp nhất dành cho vị trí "${roleName}" ngành "${industry}" đối với ứng viên chưa có kinh nghiệm, kèm câu trả lời mẫu thông minh, chân thành để gây ấn tượng mạnh với nhà tuyển dụng. Định dạng bằng tiếng Việt rõ ràng, dễ hiểu.`;

  const ai = getGeminiClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });
      return res.json({ questions: response.text, source: "gemini" });
    } catch (err: any) {
      console.error("Gemini API error in interview prep:", err?.message);
    }
  }

  const fallbackQuestions = `### 🎯 3 Câu hỏi phỏng vấn thực chiến cho vị trí ${roleName || "Nhân viên mới"}:

1. **"Bạn chưa có kinh nghiệm thực tế, làm thế nào để đảm bảo bạn hoàn thành tốt công việc này?"**
   - *Gợi ý trả lời:* "Dạ, em hiểu kinh nghiệm thực chiến là yếu tố rất quan trọng. Tuy nhiên, trong quá trình học tập, em đã rèn luyện tinh thần tự học cao và hoàn thành các đồ án sát thực tế. Em tự tin với khả năng tiếp thu nhanh và sẵn sàng dành thêm thời gian học hỏi quy trình công ty để nhanh chóng bắt nhịp hiệu quả."

2. **"Nếu gặp một nhiệm vụ mới mà bạn chưa từng làm bao giờ, bạn sẽ giải quyết thế nào?"**
   - *Gợi ý trả lời:* "Đầu tiên em sẽ tìm hiểu kỹ tài liệu nội bộ và các hướng dẫn có sẵn. Sau đó em lập kế hoạch sơ bộ các bước thực hiện. Nếu có điểm chưa chắc chắn, em sẽ chủ động hỏi anh/chị quản lý với các giải pháp em đã chuẩn bị sẵn để xin lời khuyên thay vì chỉ hỏi thụ động."

3. **"Mục tiêu phát triển của bạn trong 1 - 2 năm tới là gì?"**
   - *Gợi ý trả lời:* "Trong 6 tháng đầu, mục tiêu của em là thành thạo mọi quy trình công việc và tạo ra kết quả đóng góp thiết thực cho nhóm. Trong 1-2 năm tiếp theo, em mong muốn nâng cao kỹ năng chuyên sâu để có thể độc lập phụ trách các dự án lớn hơn và hỗ trợ các bạn mới."`;

  return res.json({ questions: fallbackQuestions, source: "curated" });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
