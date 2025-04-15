import React, { useEffect, useState } from "react";
import {
  Upload,
  DatePicker,
  Input,
  Form,
  Button,
  message,
  Select,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Country, State, City } from "country-state-city";
import dayjs from "dayjs";
import { apiPost, apiGet } from "../utils/apiHelper";

const { Dragger } = Upload;
const { TextArea } = Input;

const ArtsAndCultureHosting = () => {
  const [form] = Form.useForm();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [organizerOptions, setOrganizerOptions] = useState([]);
  const [defaultOrganizer, setDefaultOrganizer] = useState("");

  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStateList(State.getStatesOfCountry(selectedCountry));
      setCityList([]);
      form.setFieldsValue({ state: undefined, city: undefined });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCityList(City.getCitiesOfState(selectedCountry, selectedState));
      form.setFieldsValue({ city: undefined });
    }
  }, [selectedState]);

  useEffect(() => {
    const stored = localStorage.getItem("user_name");
    if (stored) {
      setDefaultOrganizer(stored);
    }
  }, []);

  useEffect(() => {
    if (defaultOrganizer) {
      form.setFieldsValue({ organizer: [defaultOrganizer] });
    }
  }, [defaultOrganizer]);

  const onFinish = async (values) => {
    const {
      logo,
      event_photos,
      date,
      organizer = [],
      ...rest
    } = values;

    const festivalName = rest.festival_name || "festival";
    const year = dayjs(date).format("YYYY");
    const safeName = festivalName.toLowerCase().replace(/[^a-z0-9]/g, "_");

    const logoFile = logo?.[0]?.originFileObj || null;
    const highlightFiles = event_photos?.map((f) => f.originFileObj) || [];

    const currentUser = localStorage.getItem("user_name") || "";

    const allOrganizers = Array.from(
      new Set([...(organizer || []), currentUser].filter(Boolean))
    );

    const payload = {
      ...rest,
      date: dayjs(date).format("YYYY-MM-DD"),
      organizers: allOrganizers,
      festival_logo: new File(
        [logoFile],
        `${safeName}_logo_${year}.${logoFile.name.split(".").pop()}`,
        { type: logoFile.type }
      ),
      festival_highlights: highlightFiles.map((file, index) =>
        new File(
          [file],
          `${safeName}_highlight_${year}_${index}.${file.name.split(".").pop()}`,
          { type: file.type }
        )
      ),
    };

    const response = await apiPost("/festivals/create", payload);
    if (response.success) {
      message.success("Festival created successfully!");
      form.resetFields();
      form.setFieldsValue({ organizer: [defaultOrganizer] }); // re-set default
    } else {
      message.error(response.message || "Failed to create festival");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Host an Arts & Culture Festival
        </h1>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ date: dayjs() }}
        >
          <Form.Item
            name="festival_name"
            label="Festival Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g. Sinulog Festival" />
          </Form.Item>

          <Form.Item
            name="logo"
            label="Festival Logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true }]}
          >
            <Dragger
              name="logo"
              multiple={false}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                const isLt5MB = file.size / 1024 / 1024 < 5;
                if (!isImage) {
                  message.error("Logo must be an image file.");
                  return Upload.LIST_IGNORE;
                }
                if (!isLt5MB) {
                  message.error("Logo must be smaller than 5MB.");
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              onPreview={(file) => {
                const url = file.thumbUrl || file.preview;
                window.open(url, "_blank");
              }}
              listType="picture"
              showUploadList={{ showPreviewIcon: true }}
              maxCount={1}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="text-sm">Click or drag to upload festival logo</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="date"
            label="Festival Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="organizer"
            label="Other Organizer(s)"
            rules={[{ required: false }]}
          >
            <Select
              mode="tags"
              showSearch
              placeholder="Type to search users..."
              value={form.getFieldValue("organizer")}
              onChange={(value) => {
                // Prevent removal of current user
                if (!value.includes(defaultOrganizer)) return;
                form.setFieldsValue({ organizer: value });
              }}
              tagRender={(props) => {
                const { label, value, onClose } = props;
                const isDefault = value === defaultOrganizer;
                return (
                  <span
                    style={{
                      marginInlineEnd: 4,
                      padding: "2px 8px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: 4,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {label}
                    {!isDefault && (
                      <span
                        style={{ marginLeft: 6, cursor: "pointer" }}
                        onClick={onClose}
                      >
                        ×
                      </span>
                    )}
                  </span>
                );
              }}
              onSearch={async (value) => {
                if (!value) return;
                const res = await apiGet("/users/search", { term: value });
                if (res.success && Array.isArray(res.data)) {
                  const results = res.data
                    .map((u) => ({
                      value: u.user_name,
                      label: u.user_name,
                    }))
                    .filter((opt) => opt.value !== defaultOrganizer);
                  setOrganizerOptions(results);
                }
              }}
              options={organizerOptions}
              tokenSeparators={[","]}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select country"
                onChange={(val) => setSelectedCountry(val)}
              >
                {countryList.map((c) => (
                  <Select.Option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="state"
              label="State/Province"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select state"
                onChange={(val) => setSelectedState(val)}
                disabled={!selectedCountry}
              >
                {stateList.map((s) => (
                  <Select.Option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select city"
                disabled={!selectedState}
              >
                {cityList.map((c) => (
                  <Select.Option key={c.name} value={c.name}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="festival_description"
            label="Festival Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={5} placeholder="Describe the event..." />
          </Form.Item>

          <Form.Item
            name="event_photos"
            label="Event Photos (Max 5 images)"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Dragger
              name="event_photos"
              multiple
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                const isLt5MB = file.size / 1024 / 1024 < 5;
                if (!isImage) {
                  message.error("Each highlight must be an image.");
                  return Upload.LIST_IGNORE;
                }
                if (!isLt5MB) {
                  message.error("Each image must be smaller than 5MB.");
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              onPreview={(file) => {
                const url = file.thumbUrl || file.preview;
                window.open(url, "_blank");
              }}
              listType="picture"
              showUploadList={{ showPreviewIcon: true }}
              maxCount={5}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="text-sm">
                Upload up to 5 images showcasing the event
              </p>
            </Dragger>
          </Form.Item>

          <div className="flex justify-end mt-6">
            <Button type="primary" htmlType="submit" size="large">
              Submit Festival
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ArtsAndCultureHosting;
