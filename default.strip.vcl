vcl 4.0;

backend default {
    .host = "127.0.0.1";
    .port = "8080";
}

sub vcl_backend_fetch {
    unset bereq.http.If-Modified-Since;
    unset bereq.http.If-None-Match;
}
