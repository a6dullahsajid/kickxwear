import Product from "@/app/models/Products";
import connectDB from "@/app/lib/mongodb";

export default async function ProductPage({ params }) {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id)
        .lean();

    if (!product) {
        return (
            <div>Product not found</div>
        );
    }
    const allImages = (product.variants || []).flatMap((v) => (v.images || []).map((i) => i.url));
    const mainImage = allImages.length ? allImages[0] : null;

    return (
        <div style={{ padding: 20, fontFamily: 'inherit', color: 'var(--color-text)' }}>
            <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr' }}>
                <div>
                    {mainImage ? (
                        <img src={mainImage} alt={product.title} style={{ width: '100%', borderRadius: 8 }} />
                    ) : (
                        <div style={{ width: '100%', height: 320, background: 'var(--color-bg-lightgrey)', borderRadius: 8 }} />
                    )}

                    <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
                        {allImages.map((url, idx) => (
                            <img key={idx} src={url} alt={`${product.title}-${idx}`} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 6 }} />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 style={{ margin: 0, color: 'black' }}>{product.title}</h1>
                    <p style={{ margin: '6px 0', color: '#555' }}><strong>SKU:</strong> {product.sku}</p>
                    <p style={{ margin: '6px 0', color: '#777' }}><strong>Category:</strong> {product.category}</p>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginTop: 8 }}>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>₹{product.SP}</div>
                        <div style={{ textDecoration: 'line-through', color: '#777' }}>₹{product.MRP}</div>
                    </div>

                    <div style={{ marginTop: 14 }}>
                        <h3 style={{ margin: '6px 0' }}>Description</h3>
                        <p style={{ color: '#333' }}>{product.description?.text}</p>

                        {product.description?.featured && (
                            <ul style={{ marginTop: 8 }}>
                                {product.description.featured.map((f, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: f }} />
                                ))}
                            </ul>
                        )}
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <h3 style={{ margin: '6px 0' }}>Variants</h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {(product.variants || []).map((v, i) => (
                                <div key={i} style={{ padding: 10, border: '1px solid #eee', borderRadius: 8, minWidth: 160 }}>
                                    <div style={{ fontWeight: 600 }}>{v.colorName}</div>
                                    <div style={{ marginTop: 8, color: v.inStock ? 'green' : 'red' }}>{v.inStock ? 'In stock' : 'Out of stock'}</div>
                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ fontSize: 13, color: '#444' }}>Sizes:</div>
                                        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                                            {(v.sizes || []).map((s) => (
                                                <div key={s} style={{ padding: '6px 8px', borderRadius: 6, background: 'var(--color-bg-lightgrey)' }}>{s}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
                        <button style={{ background: 'var(--color-button)', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer' }}>Add to cart</button>
                        <button style={{ background: 'transparent', border: '1px solid #ddd', padding: '10px 16px', borderRadius: 8, cursor: 'pointer' }}>Wishlist</button>
                    </div>

                    <div style={{ marginTop: 18, color: '#666', fontSize: 13 }}>
                        <div>Created: {product.createdAt ? new Date(product.createdAt).toLocaleString() : '—'}</div>
                        <div>Updated: {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : '—'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}