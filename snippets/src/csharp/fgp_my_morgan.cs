// using System.Diagnostics;

app.Use(async (context, next) =>
{
    var sw = Stopwatch.StartNew();
    await next();
    sw.Stop();

    Console.WriteLine(
        $"{context.Request.Method} {context.Request.Path} " +
        $"{context.Response.StatusCode} {sw.ElapsedMilliseconds}ms"
    );
});