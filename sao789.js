const http = require("http");

// ===== API SAO789 =====
const API_TX = "https://sao789lol.hacksieucap.pro/taixiu/ai";
const API_MD5 = "https://sao789lol.hacksieucap.pro/taixiumd5/ai";

// ===== CHUẨN HOÁ DATA SAO789 =====
function normalizeSao789(data) {
  const phien = typeof data.phien === "number" ? data.phien : null;

  return {
    // ===== META =====
    id: "@tiendataox",
    source: "SAO789",

    // ===== PHIÊN =====
    phien: phien,
    phien_hien_tai: phien !== null ? phien + 1 : null,
    updated: data.updated || null,

    // ===== KẾT QUẢ =====
    ket_qua: data.ket_qua || null,
    tong: data.tong || null,

    // ===== XÚC XẮC =====
    xuc_xac_1: data.xuc_xac_1 || null,
    xuc_xac_2: data.xuc_xac_2 || null,
    xuc_xac_3: data.xuc_xac_3 || null,

    // ===== DỰ ĐOÁN =====
    du_doan: data.du_doan || null,
    confidence: data.confidence || null,
    ty_le_thanh_cong: data.ty_le_thanh_cong || null,

    // ===== CẦU + PATTERN =====
    phan_loai_cau: data.phan_loai_cau || null,
    chi_tiet_cau: data.chi_tiet_cau || null,
    pattern: data.pattern || null,

    // ===== EMA =====
    ema: {
      huong: data.ema_huong || null,
      suc_manh: data.ema_suc_manh || null
    },

    status: data.status || null
  };
}

// ===== FETCH =====
async function fetchSao789(url) {
  const res = await fetch(url);
  const data = await res.json();
  return normalizeSao789(data);
}

// ===== SERVER =====
const server = http.createServer(async (req, res) => {
  try {
    let data;

    if (req.url === "/api/tx") {
      data = await fetchSao789(API_TX);
    } 
    else if (req.url === "/api/md5") {
      data = await fetchSao789(API_MD5);
    } 
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(data, null, 2));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      error: "SAO789 API error",
      detail: err.toString()
    }));
  }
});

// ===== START =====
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("✅ SAO789 API running");
  console.log("👉 /api/tx   (bàn thường)");
  console.log("👉 /api/md5  (bàn md5)");
});
