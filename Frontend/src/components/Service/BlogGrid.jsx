import React from "react";
import { Row, Col, Button, Pagination, Space } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function BlogGrid({
  loading,
  currentPosts,
  filteredTotal,
  currentPage,
  postsPerPage,
  setCurrentPage,
  cateFilter,
  setCateFilter,
  allowedCategories,
  getPostImage,
  onOpenPost,
}) {
  return (
    <section className="svc-section" id="svc-posts">
      <div className="svc-section-head">
        <h2>Bài viết dịch vụ & giải pháp</h2>
        <p>Gợi ý phương án – kinh nghiệm thực tế – case study thi công.</p>
      </div>

      <div className="svc-filter">
        <Space wrap>
          <Button
            type={cateFilter === "ALL" ? "primary" : "default"}
            onClick={() => setCateFilter("ALL")}
          >
            Tất cả
          </Button>

          {allowedCategories.map((name) => (
            <Button
              key={name}
              type={cateFilter === name ? "primary" : "default"}
              onClick={() => setCateFilter(name)}
            >
              {name}
            </Button>
          ))}
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {loading ? (
          <Col span={24}>
            <div className="svc-empty">⏳ Đang tải bài viết…</div>
          </Col>
        ) : currentPosts.length === 0 ? (
          <Col span={24}>
            <div className="svc-empty">Không có bài viết.</div>
          </Col>
        ) : (
          currentPosts.map((post) => (
            <Col xs={24} sm={12} md={8} key={post._id}>
              <div
                className="svc-post-card"
                onClick={() => onOpenPost(post.slug)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={getPostImage(post)}
                  alt={post.title}
                  className="svc-post-image"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/default.jpg")}
                />
                <div className="svc-post-content">
                  <h3 className="svc-post-title">{post.title}</h3>
                  {post.description ? (
                    <p className="svc-post-desc">
                      {(post.description || "").slice(0, 110)}…
                    </p>
                  ) : null}

                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    className="svc-post-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPost(post.slug);
                    }}
                  >
                    Khám phá
                  </Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>

      {!loading && filteredTotal > postsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={postsPerPage}
          total={filteredTotal}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className="svc-pagination"
        />
      )}
    </section>
  );
}
