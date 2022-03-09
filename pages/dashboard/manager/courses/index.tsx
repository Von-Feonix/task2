import { BackTop, Breadcrumb, Button, List, Spin } from "antd";
import Link from "next/link";
import React from "react";
import { useListEffect } from "../../../../lib/custom-hooks/listEffect";
import InfiniteScroll from "react-infinite-scroll-component";
import ManagerLayout from "../../managerDashboard";
import {
  Course,
  CourseRequest,
  CourseResponse,
} from "../../../../lib/model/course";
import apiService from "../../../../lib/services/apiService";
import { Indicator } from "../../../../lib/common/styled";
import CourseOverview from "../../../../lib/layout/courseOverview";

export default function Page() {
  const { paginator, setPaginator, hasMore, data } = useListEffect<
    CourseRequest,
    CourseResponse,
    Course
  >(apiService.getCourses.bind(apiService), "courses", true);
  return (
    <ManagerLayout>
      
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager/homepage">System</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Course</Breadcrumb.Item>
      </Breadcrumb>

      <InfiniteScroll
        next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
        hasMore={hasMore}
        loader={
          <Indicator>
            <Spin size="large" />
          </Indicator>
        }
        dataLength={data.length}
        endMessage={<Indicator>No More Course!</Indicator>}
        scrollableTarget="contentLayout"
        style={{ overflow: "hidden" }}
      >
        <List
          id="container"
          grid={{
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CourseOverview {...item}>
                <Link href="">
                  <Button type="primary">Read More</Button>
                </Link>
              </CourseOverview>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>

      <BackTop />
    </ManagerLayout>
  );
}
