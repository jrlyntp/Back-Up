import React, { useEffect, useState } from "react";
import {
  Upload,
  DatePicker,
  Input,
  Form,
  Button,
  message,
  Select,
  InputNumber,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Country, State, City } from "country-state-city";
import dayjs from "dayjs";
import { apiPost, apiGet } from "../utils/apiHelper";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import "antd/dist/reset.css";

const { Dragger } = Upload;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const EventHosting = ({ festivalId = null }) => {
  const [form] = Form.useForm();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [organizerOptions, setOrganizerOptions] = useState([]);
  const [defaultOrganizer, setDefaultOrganizer] = useState("");
  const [position, setPosition] = useState([10.3157, 123.8854]); // Cebu

  const { isLoaded } = useJsApiLoader({
   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

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
    if (stored) setDefaultOrganizer(stored);
  }, []);

  useEffect(() => {
    if (defaultOrganizer) {
      form.setFieldsValue({ organizer: [defaultOrganizer] });
    }
  }, [defaultOrganizer]);

  const onFinish = async (values) => {
    const {
      event_logo,
      event_highlights,
      date_range,
      organizer = [],
      ...rest
    } = values;

    const eventName = rest.event_name || "event";
    const year = dayjs(date_range?.[0]).format("YYYY");
    const safeName = eventName.toLowerCase().replace(/[^a-z0-9]/g, "_");

    const logoFile = event_logo?.[0]?.originFileObj || null;
    const highlightFiles = event_highlights?.map((f) => f.originFileObj) || [];

    const currentUser = localStorage.getItem("user_name") || "";

    const allOrganizers = Array.from(
      new Set([...(organizer || []), currentUser].filter(Boolean))
    );

    const payload = {
      ...rest,
      festival_id: festivalId,
      start_date: dayjs(date_range?.[0]).format("YYYY-MM-DD HH:mm:ss"),
      end_date: dayjs(date_range?.[1]).format("YYYY-MM-DD HH:mm:ss"),
      latitude: position[0],
      longitude: position[1],
      organizers: allOrganizers,
      event_logo: new File(
        [logoFile],
        `${safeName}_logo_${year}.${logoFile.name.split(".").pop()}`,
        { type: logoFile.type }
      ),
      event_highlights: highlightFiles.map((file, index) =>
        new File(
          [file],
          `${safeName}_highlight_${year}_${index}.${file.name.split(".").pop()}`,
          { type: file.type }
        )
      ),
    };

    const response = await apiPost("/events/create", payload);
    if (response.success) {
      message.success("Event created successfully!");
      form.resetFields();
      setPosition([10.3157, 123.8854]); // reset to default
      form.setFieldsValue({ organizer: [defaultOrganizer] });
    } else {
      message.error(response.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Host an Event</h1>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="event_name" label="Event Name" rules={[{ required: true }]}>
            <Input placeholder="e.g. Battle of the Bands" />
          </Form.Item>

          <Form.Item
            name="event_logo"
            label="Event Logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true }]}
          >
            <Dragger
              name="event_logo"
              multiple={false}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                const isLt5MB = file.size / 1024 / 1024 < 5;
                if (!isImage || !isLt5MB) {
                  message.error("Event logo must be an image under 5MB.");
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              listType="picture"
              maxCount={1}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="text-sm">Click or drag to upload event logo</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="date_range"
            label="Event Schedule"
            rules={[{ required: true }]}
          >
            <RangePicker className="w-full" showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item name="organizer" label="Other Organizer(s)">
            <Select
              mode="tags"
              showSearch
              placeholder="Type to search users..."
              value={form.getFieldValue("organizer")}
              onChange={(value) => {
                if (!value.includes(defaultOrganizer)) return;
                form.setFieldsValue({ organizer: value });
              }}
              onSearch={async (val) => {
                if (!val) return;
                const res = await apiGet("/users/search", { term: val });
                if (res.success) {
                  setOrganizerOptions(
                    res.data
                      .map((u) => ({ value: u.user_name, label: u.user_name }))
                      .filter((opt) => opt.value !== defaultOrganizer)
                  );
                }
              }}
              options={organizerOptions}
              tokenSeparators={[","]}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name="country" label="Country" rules={[{ required: true }]}>
              <Select showSearch onChange={setSelectedCountry} placeholder="Select country">
                {countryList.map((c) => (
                  <Select.Option key={c.isoCode} value={c.isoCode}>{c.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Select showSearch disabled={!selectedCountry} onChange={setSelectedState}>
                {stateList.map((s) => (
                  <Select.Option key={s.isoCode} value={s.isoCode}>{s.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="city" label="City" rules={[{ required: true }]}>
              <Select showSearch disabled={!selectedState}>
                {cityList.map((c) => (
                  <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="event_description"
            label="Event Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={5} placeholder="Describe the event..." />
          </Form.Item>

          <Form.Item
            name="event_participant_limit"
            label="Participant Limit"
            rules={[{ required: true, type: "number", message: "Please enter a valid number" }]}
            >
            <InputNumber className="w-full" placeholder="Max participants (e.g. 500)" />
            </Form.Item>

          {/* 📍 GOOGLE MAP LOCATION PICKER */}
          <Form.Item label="Event Location (Click on the map)">
            <div style={{ height: "400px", width: "100%" }}>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: position[0], lng: position[1] }}
                  zoom={13}
                  onClick={(e) =>
                    setPosition([e.latLng.lat(), e.latLng.lng()])
                  }
                >
                  <Marker position={{ lat: position[0], lng: position[1] }} />
                </GoogleMap>
              )}
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Latitude: {position[0].toFixed(6)}</span>
              <span>Longitude: {position[1].toFixed(6)}</span>
            </div>
          </Form.Item>

          <Form.Item
            name="event_highlights"
            label="Event Highlights (Max 5 images)"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Dragger
              name="event_highlights"
              multiple
              maxCount={5}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                const isLt5MB = file.size / 1024 / 1024 < 5;
                if (!isImage || !isLt5MB) {
                  message.error("Each highlight must be an image under 5MB.");
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              listType="picture"
              showUploadList={{ showPreviewIcon: true }}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="text-sm">Upload up to 5 images showcasing the event</p>
            </Dragger>
          </Form.Item>

          <div className="flex justify-end mt-6">
            <Button type="primary" htmlType="submit" size="large">
              Submit Event
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EventHosting;
