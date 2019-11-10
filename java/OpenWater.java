import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.stream.Collectors;

public class OpenWater {
  private final String apikey;
  private final String url;

  public OpenWater(String apikey) {
    this.apikey = apikey;
    this.url = "https://proxy-server.com:443/armadachain/openwater?apikey=" + this.apikey;
  }

  private String mapToStr(Map<String, String> map) {
	  String mapAsString = map.keySet().stream()
			  .map(key -> key + "=" + map.get(key))
			  .collect(Collectors.joining("&"));
	  return mapAsString;
  }
  
  public int create(Map<String, ?> data) throws MalformedURLException, IOException {
	  byte[] out = data.toString().getBytes(StandardCharsets.UTF_8);
	  URLConnection conn = new URL(this.url).openConnection();
	  java.net.HttpURLConnection http = (HttpURLConnection)conn;
	  http.setRequestMethod("POST");
	  http.setDoOutput(true);
	  http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
	  http.setFixedLengthStreamingMode(out.length);
	  http.connect();
	  try(OutputStream os = http.getOutputStream()) {
		  os.write(out);
	  }
	  return http.getResponseCode();
  }

  public InputStream get(Map<String, String> queries) throws MalformedURLException, IOException {
	  String query = this.mapToStr(queries);
	  URLConnection conn = new URL(this.url + "&" + query).openConnection();
	  java.net.HttpURLConnection http = (HttpURLConnection)conn;
	  http.setRequestMethod("GET");
	  http.connect();
	  return http.getInputStream();
  }
  
}