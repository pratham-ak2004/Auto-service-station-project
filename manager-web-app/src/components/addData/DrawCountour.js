// Drawing function
export const drawRect = (APIResult, ctx, imgWidth, imgHeight) => {
  for (let i = 0; i < APIResult.length; i++) {
    // Extract variables
    const [boxes, score, text] = APIResult[i];
    const [y1, x1, y2, x2] = boxes;

    // Set styling
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";

    // Draw bounding box
    ctx.beginPath();
    ctx.fillText(
      text + " - " + Math.round(score * 100) / 100,
      x1 * imgWidth,
      y1 * imgHeight - 10
    );
    ctx.rect(
      x1 * imgWidth,
      y1 * imgHeight,
      (x2 - x1) * imgWidth,
      (y2 - y1) * imgHeight
    );
    ctx.stroke();
  }
};
