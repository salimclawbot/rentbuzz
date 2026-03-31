'use client';

export function ArticleImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const fallbacks: Record<string, string> = {
    sydney: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    melbourne: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
    brisbane: 'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800',
    perth: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=800',
    suburb: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    rental: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    apartment: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    house: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    default: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
  };

  const getFallback = (altText: string) => {
    const lower = (altText || '').toLowerCase();
    for (const [key, url] of Object.entries(fallbacks)) {
      if (key !== 'default' && lower.includes(key)) return url;
    }
    return fallbacks.default;
  };

  return (
    <img
      src={src}
      alt={alt || ''}
      {...props}
      className="rounded-xl my-4 max-w-full h-auto block"
      style={{ maxWidth: '100%', height: 'auto' }}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.onerror = null;
        img.src = getFallback(alt || '');
      }}
    />
  );
}
